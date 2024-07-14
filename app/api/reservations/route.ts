import { NextResponse } from "next/server";

import  Prisma  from "@/app/libs/prismadb"
import getCurrentUser from "@/app/actions/getcurrentuser";

export async function POST(req:Request){
    const currentUser = await getCurrentUser();

    if(!currentUser){
        return NextResponse.error()
    }

    const body = await req.json()
    const{
        listingId,
        startDate,
        endDate,
        totalPrice
    } = body

    if(!( listingId && startDate && endDate && totalPrice)){
        return NextResponse.error()
    }

    const listingAndReservation = await prisma?.listing.update({
        where:{
            id:listingId
        },
        data:{
            reservation:{
                create:{
                    userId:currentUser.id,
                    startDate,
                    endDate,
                    totalPrice
                }
            }
        }
    })

    return NextResponse.json(listingAndReservation)
}