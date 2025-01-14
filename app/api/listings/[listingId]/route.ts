import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getcurrentuser";
import prisma from '@/app/libs/prismadb'

interface Iparams{
    listingId?:string;
}

export async function DELETE(req:Request,{params}:{params:Iparams}) {
    const currentUser  = await getCurrentUser()
    if(!currentUser){
        return NextResponse.error()
    }

    const {listingId}= params

    if(!listingId || typeof listingId !== 'string'){
        throw new Error('Invalid data')
    }

    const listing = await prisma.listing.deleteMany({
        where:{
            id:listingId,
            userId:currentUser.id
          
        }
    })
        return NextResponse.json(listing)
}