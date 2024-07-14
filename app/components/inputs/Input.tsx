"use client";
import React, { useCallback, useState } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { BiDollar, BiShow, BiSolidHide } from "react-icons/bi";

interface inputprops {
  label: string;
  id: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}
const Input: React.FC<inputprops> = ({
  label,
  id,
  type = "text",
  disabled,
  formatPrice,
  required,
  register,
  errors,
}) => {

  const [show, setshow] = useState(false)

  const toggle = useCallback(()=>{
        setshow((prev)=>!prev)
  },[show])


  return (
    <div className="w-full relative">
      {formatPrice && (
        <BiDollar size={24} className="text-neutral-700 top-5 left-2" />
      )}
      <input
        type={type === "password" && show ? "text" : type}
        id={id}
        placeholder=""
        disabled={disabled}
        {...register(id, { required })}
        className={`peer w-full p-4  pt-6 font-light bg-white border-2 rounded-md outline-none disabled:opacity-70 transition disabled:cursor-not-allowed 
            ${formatPrice?'pl-9':"pl-4"}
            ${errors[id]?'border-rose-500':'border-neutral-500'}
            ${errors[id]?'border-rose-500':'border-neutral-500'}
            ${errors[id]?'focus:border-rose-500':'focus:border-black-500'}
            `}
      ></input>
      <label className={`
      absolute
      text-md
      duration:150
      transform
      -translate-y-3
      top-5
      z-10
      ${formatPrice?'left-9':'left-4'}
      peer-placeholder-shown:scale-100
      peer-placeholder-shown:translate-y-0
      peer-focus:scale-75
      peer-focus:-translate-y-4
      ${errors[id]?"text-rose-500":"text-zinc-400"}
        `}>
        {label}
      </label>
     {type === "password" && (
        <button 
          type="button" 
          onClick={toggle} 
          className="absolute right-4 top-5"
        >
          {show ? <BiSolidHide size={24} /> : <BiShow size={24} />}
        </button>
      )}

     
    </div>
  );
};

export default Input;
