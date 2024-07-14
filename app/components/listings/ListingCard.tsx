"use client";
import React, { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { format } from "date-fns";
import { Listing, Reservation } from "@prisma/client";
// import getCurrentUser from "@/app/actions/getCurrentUser";
import useCountries from "@/app/hooks/useCountries";
import  { SafeReservation, safeUSer }  from "@/app/types";
import HeartButton from "../HeartButton";
import Button from "../Button";

interface ListingCardProps {
  data: Listing;
  reservation?: SafeReservation ;
  onAction?: (id: string) => void;
  disabledLabel?: string;
  actionId?: string;
  currentUser?: safeUSer | null;
  disabled?: boolean;
  actionLabel?: string;
}

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabledLabel,
  actionId = "",
  currentUser,
  disabled,
  actionLabel
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();

  const location = getByValue(data.locationValue);
  console.log(location);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      onAction?.(actionId);
    },
    [onAction, actionId, disabled]
  );

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }
    return data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);
    return `${format(start, "pp")} - ${format(end, "pp")}`;
  }, [reservation]);

  return (
    <div
      onClick={() => router.push(`/listing/${data.id}`)}
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          <Image
            fill
            src={data.imageSrc}
            alt=""
            className="object-cover h-full w-full group-hover:scale-110 transition-transform"
          />
          <div className="absolute top-3 right-3">
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
        <div className="font-semibold text-lg">
          {location?.region}, {location?.label}
        </div>
        <div className="font-light text-neutral-500">
                {reservationDate || data.category}
        </div>
        <div className="flex flex-row items-center gap-1">
            <div className="font-semibold">
                        ${data.price}
            </div>
            {
                !reservation && (
                    <div className="font-light">
                        night
                    </div>
                )
            }
        </div>
        {
            onAction && actionLabel &&  (
                <Button disabled={disabled} small label={actionLabel} onclick={handleCancel}/>

                
            )
        }
      </div>
    </div>
  );
};

export default ListingCard;
