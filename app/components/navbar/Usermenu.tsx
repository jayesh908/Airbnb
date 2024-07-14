"use client";

import React, { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import Menuitems from "./Menuitems";
import useRegisterModal from "@/app/hooks/useRegisterModal"; // Import the correct hook
import useloginModel from "@/app/hooks/useLogin";
import { safeUSer } from "@/app/types";
import useRentModal from "@/app/hooks/useRentModal";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
interface Usermenuprops {
  currentuser?: safeUSer | null;
}

const Usermenu: React.FC<Usermenuprops> = ({ currentuser }) => {
  const registerModal = useRegisterModal();
  const LoginModal = useloginModel();
  const rentModal = useRentModal();

  const router = useRouter()
  const [isOpen, setisOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setisOpen((prev) => !prev);
  }, [isOpen]);
  const onRent = useCallback(() => {
    if (!currentuser) {
      return LoginModal.onOpen();
    }
    rentModal.onOpen();
  }, [currentuser, LoginModal, rentModal]);
  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="hidden md:block text-sm rounded-full py-3 px-4 hover:bg-neutral-100 transoition cursor-pointer"
        >
          Airbnb your home
        </div>
        <div
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full hover-shadow-md cursor-pointer"
        >
          <AiOutlineMenu />
          <div className=" hidden md:block">
            <Avatar src={currentuser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {currentuser ? (
              <>
                <Menuitems onClick={() =>router.push("/trips") } label="My Trips " />
                <Menuitems onClick={() =>router.push("/favourites")} label="My Favourite" />
                <Menuitems onClick={() => router.push("/reservations")} label="My Reservation" />
                <Menuitems onClick={() => router.push("/properties")} label="My Properties" />
                <Menuitems onClick={rentModal} label="My Airbnb my Home" />
                <hr />
                <Menuitems onClick={() => signOut()} label="Logout" />
              </>
            ) : (
              <>
                <Menuitems onClick={LoginModal.onOpen} label="Login" />
                <Menuitems onClick={registerModal.onOpen} label="SignUp" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Usermenu;
