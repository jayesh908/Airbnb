import { Listing, Reservation, User } from "@prisma/client";
export type safeUSer = Omit<
  User,
  "createdAt" | "updatedAt" | "emailverfied"
> & {
  createdAt: string;
  updatedAt: string;
  emailverified: string | null;
  image: string | null;
};

export type Safelisting = Omit<Listing, "createdAt"> & { createdAt: string };

export type SafeReservation = Omit<
  Reservation,
  "createdAt" | "startDate" | "endDate" | "listing"
> & {
  createdAt: string;
  startDate: string;
  endDate: string;
  listing: string;
};
