import {create} from 'zustand'


interface loginstore{
    isOpen:boolean;
    onOpen:()=>void;
    onClose:()=>void
}

const useloginModel = create<loginstore>((set)=>({
        isOpen:false,
        onOpen:()=>set({isOpen:true}),
        onClose:()=>set({isOpen:false})
}))

export default useloginModel
