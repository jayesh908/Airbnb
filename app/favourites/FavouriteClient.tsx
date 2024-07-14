"use client";
import React from "react";
import { Safelisting, safeUSer } from "../types";
import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/ListingCard";

interface FavouriteClientProps {
  listings: Safelisting[];
  currentUser?: safeUSer | null;
}

const FavouriteClient: React.FC<FavouriteClientProps> = ({
  listings,
  currentUser,
}) => {
  return (
    <Container>
      <Heading
        title="Favourites"
        subtitle="List of Places you have favourited"
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-8">
        {listings.map((listing) => (
          <ListingCard
            currentUser={currentUser}
            key={listing.id}
            data={listing}
          />
        ))}
      </div>
    </Container>
  );
};

export default FavouriteClient;
