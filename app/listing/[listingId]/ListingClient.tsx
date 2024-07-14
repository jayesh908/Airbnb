"use client";
import { SafeReservation, safeUSer } from "@/app/types";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { categories } from "@/app/components/navbar/Categories";
import Container from "@/app/components/Container";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import useloginModel from "@/app/hooks/useLogin";
import { useRouter } from "next/navigation";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import axios from "axios";
import toast from "react-hot-toast";
import ListingReservation from "@/app/components/listings/ListingReservation";
import { Range } from "react-date-range";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};
interface listingclientprops {
  reservation?: SafeReservation[];
  listing?: any & {
    user: safeUSer;
  };
  currentUser?: safeUSer | null;
}
const ListingClient: React.FC<listingclientprops> = ({
  listing,
  currentUser,
  reservation = [],
}) => {
  const loginModal = useloginModel();
  const router = useRouter();

  const disabledDate = useMemo(() => {
    let dates: Date[] = [];
    reservation.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });
    return dates;
  }, [reservation]);

  const [isLoading, setisLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    setisLoading(true)
    axios.post('/api/reservations',{
        totalPrice,
        startDate:dateRange.startDate,
        endDate:dateRange.endDate,
        listingId:listing?.id
    }).then(()=>{
        toast.success('listing reseved')
        setDateRange(initialDateRange);
        //redirect to /trips
        router.push('/trips')
    }).catch(()=>toast.error('something went wrong'))
  }, [dateRange,totalPrice,router,currentUser,listing?.id,loginModal]);

  useEffect(()=>{
    if(dateRange.startDate && dateRange.endDate){
        const dayCount = differenceInCalendarDays(
            dateRange.endDate,
            dateRange.startDate
        );
        if(dayCount && listing.price){
            setTotalPrice(dayCount*listing.price)
        }
        else{
            setTotalPrice(listing.price)
        }
    }
  },[listing.price,dateRange])

  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category);
  }, [listing.category]);
  return (
    <div>
      <Container>
        <div className="max-w-screen-lg mx-auto">
          <div className="flex flex-col gap-6">
            <ListingHead
              title={listing.title}
              imageSrc={listing.imageSrc}
              locationvalue={listing.locationValue}
              id={listing.id}
              currentUser={currentUser}
            />

            <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
              <ListingInfo
                user={listing.user}
                category={category}
                description={listing.description}
                roomCount={listing.roomCount}
                guestCount={listing.guestCount}
                bathroomCount={listing.bathroomCount}
                locationValue={listing.locationValue}
              />
            </div>
            <div className="
            order-first
            mb-10
            md:order-last
            md:col-span-3
            ">
            <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={(value)=>setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disabled={isLoading}
                disabledDate = {disabledDate}

            />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ListingClient;
