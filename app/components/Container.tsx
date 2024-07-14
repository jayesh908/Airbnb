'use client'

import React from 'react'

    interface Containerprops{
        children:React.ReactNode;

    }
const Container:React.FC<Containerprops> = ({children}) => {
  return (
    <div className='
        max-w-[2520px]
        mx-auto
        xl:px-20
        md:px-10
    '>
        {children}
    </div>
  )
}

export default Container
