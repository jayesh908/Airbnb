import Prisma  from "@/app/libs/prismadb"

interface Iparams{
    listingId?:string
}

export default async function getlistingById(params:Iparams){
        try {
            const{listingId} = params
            const listing = await prisma?.listing.findUnique({
                where:{
                    id:listingId
                },
                include:{
                    user:true
                }
            })

            if(!listing){
                return null
            }

            return{
                ...listing,
                createdAt:listing.createdAt.toISOString(),
                user:{
                    ...listing.user,
                    createdAt:listing.user.createdtAt.toISOString(),
                    updatedAt:listing.user.updatedAt.toISOString(),
                    emailVerified   : listing.user.emailverified?.toISOString() || null
                }
            }
        } catch (error:any) {
           throw new Error(error)
        }
      
}