import axios from "axios";
import { useRouter } from "next/navigation";
import { safeUSer } from "../types";
import useloginModel from "./useLogin";
import { useCallback, useMemo } from "react";
import toast from "react-hot-toast";


interface IUserFavourite{
    listingId:string;
    currentUser?:safeUSer | null
}

const useFavourite = ({
    listingId,
    currentUser
}:IUserFavourite)=>{
        const router = useRouter()
        const loginModel = useloginModel()
        const hasFavourited = useMemo(()=>{
                const list = currentUser?.favouiteIds || []

                return list.includes(listingId)
        },[currentUser,listingId])

        const togglefav= useCallback(async(e:React.MouseEvent<HTMLDivElement>)=>{
                e.stopPropagation();
                if(!currentUser){
                    return loginModel.onOpen()
                }

                try {
                    let request
                    if(hasFavourited){
                        request = ()=>{
                            axios.delete(`/api/favorites/${listingId}`)
                        }
                    }
                    else{
                        request = ()=>axios.post(`/api/favorites/${listingId}`)
                    }
                    await request()
                    router.refresh()
                    toast.success('success')
                } 
                catch(error){
                    toast.error('Something Went Wrong')
                }

        },[listingId,currentUser,hasFavourited,loginModel,router])

        return {
            hasFavourited,
            togglefav
        }
}

export default useFavourite