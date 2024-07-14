'use client'
import React, { useCallback, useState } from 'react';
import { SafeReservation, safeUSer } from '../types';
import Container from '../components/Container';
import Heading from '../components/Heading';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import ListingCard from '../components/listings/ListingCard';

interface TripsClientProps {
  reservations: SafeReservation[];
  currentUser: safeUSer | null;
}

const TripsClient: React.FC<TripsClientProps> = ({
  reservations,
  currentUser
}) => {

  const router = useRouter();
  const [deletingId, setDeletingID] = useState('');

  const onCancel = useCallback((id: string) => {
    setDeletingID(id);
    axios.delete(`/api/reservation/${id}`)
      .then(() => {
        toast.success("Reservation Cancelled");
        router.refresh(); // Use router.reload() instead of router.refresh()
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error || "Failed to cancel reservation");
      });
  }, []);

  return (
    <Container>
      <Heading title='Trips' subtitle='where You have been and where you are going'/>
      <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
        {/* {
          reservations.map((reservation) => (
                <ListingCard
                key={reservation.id}
                data={reservation.listing}
                reservation={reservation}
                actionId={reservation.id}
                onAction={onCancel}
                disabled={deletingId === reservation.id}
                currentUser={currentUser}
                />
          ))
        } */}
      </div>
    </Container>
  );
}

export default TripsClient;
