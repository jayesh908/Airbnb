'use client'

import React from 'react'
import Container from '../Container'
import Logo from './Logo'
import Search from './Search'
import Usermenu from './Usermenu'
import { safeUSer } from '@/app/types'
import Categories from './Categories'

interface navbarprops{
    currentuser?:safeUSer | null
}
const Navbar:React.FC<navbarprops> = ({currentuser}) => {

return (
    <div className='fixed w-full bg-white z-10 shadow-sm'>
        <div className='py-4 border-b-[1px]'>
                <Container>
                    <div className='flex flex-row items-center justify-between gap-3 md:gap-0'>
                        <Logo/>
                        <Search/>
                        <Usermenu currentuser = {currentuser}/>
                    </div>
                  
                </Container>
        </div>
        <Categories/>
</div>
)
}

export default Navbar
