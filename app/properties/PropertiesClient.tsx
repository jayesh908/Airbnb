'use client'
import React, { useCallback, useState } from 'react';
import { Safelisting, safeUSer } from '../types';
import Container from '../components/Container';
import Heading from '../components/Heading';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import ListingCard from '../components/listings/ListingCard';

interface PropertiesClient {
  listings: Safelisting[];
  currentUser: safeUSer | null;
}

const PropertiesClient: React.FC<PropertiesClient> = ({
  listings,
  currentUser
}) => {

  const router = useRouter();
  const [deletingId, setDeletingID] = useState('');

  const onCancel = useCallback((id: string) => {
    setDeletingID(id);
    axios.delete(`/api/listings/${id}`)
      .then(() => {
        toast.success("Listings Cancelled");
        router.refresh(); // Use router.reload() instead of router.refresh()
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error || "Failed to cancel reservation");
      });
  }, []);

  return (
    <Container>
      <Heading title='Properties' subtitle='list of all your properties'/>
      <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
        {/* {
          listings.map((listings) => (
                <ListingCard
                key={listings.id}
                data={listings.listing}
                listings={listings}
                actionId={listings.id}
                onAction={onCancel}
                disabled={deletingId === listings.id}
                currentUser={currentUser}
                />
          ))
        } */}
      </div>
    </Container>
  );
}

export default PropertiesClient;

