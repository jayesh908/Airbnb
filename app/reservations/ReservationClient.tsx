'use client'
import React, { useCallback, useState } from 'react'
import Container from '../components/Container'
import Heading from '../components/Heading'
import { SafeReservation, safeUSer } from '../types'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast'
import ListingCard from '../components/listings/ListingCard'

interface ReservationsClientProps{
    reservations:SafeReservation;
    currentUser?:safeUSer | null;
}
const ReservationClient:React.FC<ReservationsClientProps> = ({
    reservations,currentUser
}) => {

    const router = useRouter()
    const[deletingId,setDeletingID] = useState('')

    const onCancel = useCallback((id:string)=>{
        setDeletingID(id);
        axios.delete(`/api/reservation/${id}`).then(()=>{
            toast.success('Reservation Cancelled')
            router.refresh()
        }).catch(()=>{
            toast.error('something Went Wrong')
        })
    },[router])

  return (
    <Container>
      <Heading 
      title='Reservation'
      subtitle="Bookings on Your Property"
      />
      <div className='mt-10 grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-8'>
        {
            reservations.map((reservation)=>{
                <ListingCard

                key={reservation.id}
                data={reservation.data}
                reservation={reservation}
                actionId={reservation.id}
                onAction={onCancel}
                disabled={deletingId === reservation.id}
                actionLabel='cancel guest reservation'
                currentUser={currentUser}
                />
            })
        }
      </div>
    </Container>
  )
}

export default ReservationClient
