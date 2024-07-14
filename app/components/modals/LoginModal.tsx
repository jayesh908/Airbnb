"use client";
import React, { useCallback, useState } from "react";
import { signIn } from "next-auth/react";
import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import toast from "react-hot-toast";
import Button from "../Button";
import useloginModel from "@/app/hooks/useLogin";
import { useRouter } from "next/navigation";
import useRegisterModal from "@/app/hooks/useRegisterModal";

const LoginModal = () => {
  const router = useRouter();
  const Loginmodal = useloginModel();
  const registerModal = useRegisterModal()
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((res) => {
      setIsLoading(false);
      if (res?.ok) {
        toast.success("Logged In");
        router.refresh();
        Loginmodal.onClose();
      }
      if (res?.error) {
        toast.error("Something Went Wrong");
      }
    });
  };
  const toggle = useCallback(()=>{
    Loginmodal.onClose()
    registerModal.onOpen()
  },[Loginmodal,registerModal])

  const body = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome Back" subtitle="Login to your Account" />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footer = (
    <div className="flex justify-center flex-col gap-4 pt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onclick={() => signIn("google")}
      />
      <Button
        outline
        label="Continue with GitHub"
        icon={AiFillGithub}
        onclick={() => signIn("github")}
      />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="flex flex-row items-center gap-2">
          <div>First Time Using Airbnb?</div>
          <div
            onClick={toggle}
            className="cursor-pointer hover:underline"
          >
           Create an Account
          </div>
        </div>
      </div>
    </div>
  );


  return (
    <>
      <Modal
        disabled={isLoading}
        isOpen={Loginmodal.isOpen}
        title="Login"
        actionLabel="Continue"
        onClose={Loginmodal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={body}
        footer={footer}
      />
    </>
  );
};

export default LoginModal;
