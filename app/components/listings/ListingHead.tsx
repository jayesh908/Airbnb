"use client";
import useCountries from "@/app/hooks/useCountries";
import { safeUSer } from "@/app/types";
import React from "react";
import Heading from "../Heading";
import Image from "next/image";
import HeartButton from "../HeartButton";

interface listingheadprops {
  title: string;
  locationvalue: string;
  imageSrc: string;
  id: string;
  currentUser: safeUSer | null;
}

const ListingHead: React.FC<listingheadprops> = ({
  title,
  locationvalue,
  imageSrc,
  currentUser,
  id,
}) => {
  const { getByValue } = useCountries();
  const location = getByValue(locationvalue);
  return (
    <>
      <Heading
        title={title}
        subtitle={`${location?.region},${location?.label}`}
      />
      <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
        <Image
          alt="image"
          src={imageSrc}
          fill
          className="object-cover w-full"
        />
        <div className="absolute top-5 right-5">
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
};

export default ListingHead;
