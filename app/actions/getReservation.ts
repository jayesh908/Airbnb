import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId?: string;
  userId: string;
  authorId?: string; // Make authorId optional
}

export default async function getReservation(params: IParams) {
  const { listingId, userId, authorId } = params;
  try {
    const query: any = {};

    if (listingId) {
      query.listingId = listingId;
    }

    if (userId) {
      query.userId = userId;
    }

    if (authorId) {
      query.authorId = authorId;
    }

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const safeReservations = reservations.map((reservation) => ({
      ...reservation,
      createdAt: reservation.createdAt.toISOString(),
      startDate: reservation.startDate.toISOString(),
      listing: {
        ...reservation.listing,
        createdAt: reservation.listing.createdAt.toISOString(),
      },
    }));

    return safeReservations;
  } catch (error) {
    console.error('Error fetching reservations:', error);
    throw new Error('Failed to fetch reservations');
  }
}
    