'use client'

import React, { useEffect, useState } from 'react';
import EmptyState from "../components/EmptyState";
import getReservation from "../actions/getReservation";
import ReservationClient from "./ReservationClient";
import getCurrentUser from '../actions/getcurrentuser';

const ReservationPage: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [reservation, setReservation] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getCurrentUser();
        if (user) {
          setCurrentUser(user);
          const reservations = await getReservation({ authorId: user.id });
          setReservation(reservations);
        } else {
          setCurrentUser(null);
          setReservation([]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error state if necessary
      }
    };

    fetchData();
  }, []);

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please Login" />;
  }

  if (reservation.length === 0) {
    return (
      <EmptyState
        title="No reservations found"
        subtitle="There are no reservations associated with your account"
      />
    );
  }

  return <ReservationClient reservation={reservation} currentUser={currentUser} />;
};

export default ReservationPage;
