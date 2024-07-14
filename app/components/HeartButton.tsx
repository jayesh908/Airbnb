'use client'
import React from 'react'
import { safeUSer } from '../types'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import useFavourite from '../hooks/useFavourite'

interface heartButtonprops{
    listingId:string
    currentUser:safeUSer |null

}
const HeartButton:React.FC<heartButtonprops> = ({
    listingId,currentUser
}) => {
    const{ hasFavourited,togglefav }= useFavourite({listingId,currentUser}) 
  return (
    <div onClick={togglefav} className='relative hover:opacity-80 transition cursor-pointer'>
            <AiOutlineHeart size={"28"} className='fill-white absolute -top-[2px] -right-[2px]'/>
            <AiFillHeart size={"24"} className={hasFavourited?'fill-rose-500':'fill-neutral-500'}/>
    </div>
  )
}

export default HeartButton
