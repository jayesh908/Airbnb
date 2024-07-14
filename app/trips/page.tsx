import EmptyState from "../components/EmptyState";
import getCurrentUser from "../actions/getcurrentuser";
import getReservation from "../actions/getReservation";
import TripsClient from "./TripsClient";

const TripPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="unAuthorized" subtitle="Please Login" />;
  }

  const reservation = await getReservation({
    userId: currentUser.id,
  });

  if (reservation.length === 0) {
    return (
      <EmptyState
        title="No trips Found"
        subtitle="Looks like you haven't reserved any trip"
      />
    );
  }

  return <TripsClient reservation={reservation} currentUser={currentUser} />;
};

export default TripPage;
