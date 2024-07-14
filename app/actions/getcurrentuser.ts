import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import primsa from '@/app/libs/prismadb'

export async function getsession(){
    return await getServerSession(authOptions);
}

export default async function getCurrentUser(){
    try {
        const session  = await getsession()
        if(!session?.user?.email){
            return null
        }

        const currentuser = await primsa.user.findUnique({
            where:{
                email:session.user.email as string
            }
        })

        if(!currentuser){
            return null
        }

        return {
            ...currentuser,
            createdAt:currentuser.createdtAt.toISOString(),
            updatedAt:currentuser.updatedAt.toISOString(),
            emailverified:currentuser.emailverified?.toISOString()||null
        }
    } catch (error) {
        return null
    }
}