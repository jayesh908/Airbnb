"use client";

import React, { useCallback, useMemo, useState } from "react";
import Modal from "./Modal";
import useSearchModal from "@/app/hooks/useSearchModal";
import { useRouter, useSearchParams } from "next/navigation";
import CountrySelect, { CountrySelectValues } from "../inputs/CountrySelect";
import { Range } from "react-date-range";
import dynamic from "next/dynamic";
import qs from "query-string";
import { formatISO } from "date-fns";
import Heading from "../Heading";
import Calender from "../inputs/Calender";
import Counter from "../inputs/Counter";

const SearchModal = () => {
  const router = useRouter();
  const params = useSearchParams();
  const searchModal = useSearchModal();

  enum Steps {
    LOCATION = 0,
    DATE = 1,
    INFO = 2,
  }

  const [location, setLocation] = useState<CountrySelectValues>();
  const [step, setStep] = useState(Steps.LOCATION);
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        ssr: false,
      }),
    [location]
  );

  const onBack = () => {
    setStep((value) => Math.max(value - 1, Steps.LOCATION));
  };

  const onNext = () => {
    setStep((value) => Math.min(value + 1, Steps.INFO));
  };
  const onSubmit = useCallback(async () => {
    if (step !== Steps.LOCATION) {
      return onNext();
    }

    let currentQuery = {};
    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount,
    };

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }
    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    setStep(Steps.LOCATION);
    searchModal.onClose();
    router.push(url);
  }, [
    location,
    step,
    guestCount,
    roomCount,
    bathroomCount,
    dateRange,
    params,
    searchModal,
    router,
  ]);

  const actionLabel = useMemo(() => {
    if (step !== Steps.INFO) {
      return "search";
    }
    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === Steps.LOCATION) {
      return undefined;
    }
    return "BAck";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Where do you wanna be go"
        subtitle="Find the perfect location"
      />
      <CountrySelect
        value={location}
        onChange={(value) => setLocation(value as CountrySelectValues)}
      />
      <hr />
      <Map center={location?.latlng} />
    </div>
  );

  if (step === Steps.DATE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="When do you want to go?"
          subtitle="MAke sure everyOne is Free"
        />
        <Calender
          value={dateRange}
          onChange={(value) => setDateRange(value.selection)}
        />
      </div>
    );
  }
  if (step === Steps.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="More Information" subtitle="Find Your Perfect Place" />
        <Counter
          title="Guest"
          subtitle="How many guests are coming?"
          value={guestCount}
          onChange={(value) => setGuestCount(value)}
        />
        <Counter
          title="Rooms"
          subtitle="How many rooms do you need?"
          value={roomCount}
          onChange={(value) => setRoomCount(value)}
        />
        <Counter
          title="Bathrrom"
          subtitle="How many Bathroom do you need?"
          value={bathroomCount}
          onChange={(value) => setBathroomCount(value)}
        />
      </div>
    );
  }
  return (
    <Modal
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      onSubmit={onSubmit}
      title="Filters"
      actionLabel={actionLabel}
      body={bodyContent}
      secondaryAction={step === Steps.LOCATION ? "undefined" : onBack}
      secondaryLabel={secondaryActionLabel}
    />
  );
};

export default SearchModal;
