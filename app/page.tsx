// import Image from "next/image";
import getListings, { IListingParams } from "./actions/getListing";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components/listings/ListingCard";
interface HomeProps{
  searchParams:IListingParams
}
 const Home = async({searchParams}:HomeProps)=> {

  const listing = await getListings(searchParams)
  // const isEmpty = true
  if(listing.length ===0){
    return (
      <EmptyState showReset/>
    )
  }

  return (
    <Container>
      <div
        className="pt-24 
       grid
       grid-cols-1
        sm:grid-cols-2
         md:grid-cols-3 
         lg:grid-cols-4
          xl:grid-cols-5
           2xl:grid-cols-6
            gap-8"
      >{
        listing.map((listing:any)=>{
          return(
            <ListingCard key={listing.id} data={listing}/>

          )
        })
      }</div>
    </Container>
  );
}

export default Home