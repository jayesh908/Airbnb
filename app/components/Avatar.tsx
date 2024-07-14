'use client'
import React from 'react'
import Image from 'next/image'

interface avatarprop{
  src:string | null | undefined
}
const Avatar:React.FC<avatarprop> = ({src}) => {
  return (
    <Image className='rounded-full'
    height="30"
    width="30"
    alt='avatar'
    src={src ||"/images/placeholder.jpg"}>
      
    </Image>
  )
}

export default Avatar
