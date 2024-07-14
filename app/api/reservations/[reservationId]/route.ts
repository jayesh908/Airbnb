import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getcurrentuser";
import prisma from '@/app/libs/prismadb'

interface Iparams{
    reservationId?:string;
}

export async function DELETE(req:Request,{params}:{params:Iparams}) {
    const currentUser  = await getCurrentUser()
    if(!currentUser){
        return NextResponse.error()
    }

    const {reservationId}= params

    if(!reservationId || typeof reservationId !== 'string'){
        throw new Error('Invalid data')
    }

    const reservation = await prisma.reservation.deleteMany({
        where:{
            id:reservationId,
            OR:[
                {userId:currentUser.id},
                {listing:{userId:currentUser.id}}
            ]
        }
    })
        return NextResponse.json(reservation)
}