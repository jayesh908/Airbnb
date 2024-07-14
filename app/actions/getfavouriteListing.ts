import prisma from '@/app/libs/prismadb'
import getCurrentUser from './getcurrentuser'

export default async function getFavouritelisting() {
    try {
const currentUser = await getCurrentUser();

if(!currentUser){
    return []
}

const favourites = await prisma.listing.findMany({
    where:{
        id:{
            in:[...(currentUser.favouiteIds || [])]
        }
    }
})

    const safeFavourites = favourites.map((favourites)=>(
        {
            ...favourites,
            createdAt:favourites.createdAt.toISOString()
        }
    ))
    return safeFavourites
    } catch (error:any) {
        throw new Error(error)
    }
    
}