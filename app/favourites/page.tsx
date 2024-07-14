import getCurrentUser from "../actions/getcurrentuser";
import getFavouritelisting from "../actions/getfavouriteListing";
import EmptyState from "../components/EmptyState";
import FavouriteClient from "./FavouriteClient";

const ListingPage = async()=>{

    const listing = await getFavouritelisting()
    const currentUser = await getCurrentUser()

    if(listing.length ===0){
        return(
            <EmptyState
            title="no favourites found"
            subtitle="Looks like you have no favourite listing "
            />
        )
    }
        return(
            <EmptyState
            title="No Favourites Found"
            subtitle="LOOK Like you don't have favourite Listing"
            />   
        )

        return(
            <FavouriteClient
            listings = {listing}
            currentUser = {currentUser}
            />
        )
}

export default ListingPage
