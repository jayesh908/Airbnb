
import getCurrentUser from '@/app/actions/getcurrentuser'
import getlistingById from '@/app/actions/getListingById'
import EmptyState from '@/app/components/EmptyState'
import React from 'react'
import ListingClient from './ListingClient'
import getReservation from '@/app/actions/getReservation'
interface Iparams{
    listingId?:string
}
const ListingPage = async({params}:{params:Iparams}) => {
    const listing = await getlistingById(params)
    const currentUser = await getCurrentUser()
    const Reservation = getReservation(params)
    if(!listing){
        return<EmptyState/>
    }
  return (
    <div>
      <ListingClient listing={listing} currentUser={currentUser} reservations={Reservation}/>
    </div>
  ) 
}

export default ListingPage
