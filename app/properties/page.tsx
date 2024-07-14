import EmptyState from "../components/EmptyState";
import getCurrentUser from "../actions/getcurrentuser";
import getReservation from "../actions/getReservation";
import getListings from "../actions/getListing";
import TripsClient from "../trips/TripsClient";
import PropertiesClient from "./PropertiesClient";

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="unAuthorized" subtitle="Please Login" />;
  }

  const listing = await getListings({
    userId: currentUser.id,
  });

  if (listing.length === 0) {
    return (
      <EmptyState
        title="No Properties Found"
        subtitle="Looks like you have no properties"
      />
    );
  }

  return <PropertiesClient listing={listing} currentUser={currentUser} />;
};

export default PropertiesPage;
