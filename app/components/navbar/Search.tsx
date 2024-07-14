"use client";
import useCountries from "@/app/hooks/useCountries";
import useSearchModal from "@/app/hooks/useSearchModal";
import { differenceInDays } from "date-fns";
import { useSearchParams } from "next/navigation";
import React, { useMemo } from "react";
import { BiSearch } from "react-icons/bi";


const Search = () => {
  const searchModal = useSearchModal()
  const params = useSearchParams()
  const{getByValue}  = useCountries()

  const locationvalue = params?.get('locationValue')
  const startDate = params?.get('startDate')
  const endDate = params?.get('endDate')
  const guestCount = params?.get('guestCount')

  const locationLabel = useMemo(()=>{
    if(!locationvalue){
      return getByValue(locationvalue as string)?.label
    }
    return 'AnyWhere'
  },[getByValue,locationvalue])


  const durationLabel = useMemo(()=>{
    if(startDate && endDate){
      const start = new Date(startDate as string)
      const end = new Date(endDate as string)
      let diff = differenceInDays(end,start)
      
      if(diff === 0){
        diff = 1
      }
      return `${diff} days`
    }
    return  'Anyweek'
  },[startDate,endDate])

  const guestLabel = useMemo(()=>{
    if(guestCount){
      return `${guestCount},Guests`
    }
    return 'Add Guests'
  },[guestCount])
  return (
    <div className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer" onClick={searchModal.onOpen}>
      <div className="flex flex-row items-center justify-between">
        <div className="text-sm font-semibold px-6">
          Anywhere
        </div>

        <div className="hidden sm:flex text-sm font-semibold px-6 border-l-[1px] flex-1 justify-center">
          Anyweek
        </div>

        <div className="text-sm ps-6 pr-2 text-gray-600 flex flex-row gap-3 items-center">
        <div className="hidden sm:block">
            Add Guest
        </div>

        <div className=" p-2 bg-rose-500  text-white rounded-full">
            <BiSearch size={18}/>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
