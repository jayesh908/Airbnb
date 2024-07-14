"use client";
import React, { useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface counterprops {
  title: string;
  subtitle: string;
  onChange: (value: number) => void;
  value: number;
}
const Counter: React.FC<counterprops> = ({
  title,
  subtitle,
  value,
  onChange,
}) => {
  const onAdd = useCallback(() => {
    onChange(value + 1);
  }, [onChange, value]);

  const onReduce = useCallback(() => {
    if (value > 1) {
        onChange(value - 1);
      }
  }, [onChange, value]);
  return (
    <div className="flex flex-row justify-between items-center">
      <div className="flex flex-col">
        <div className="font-medium">{title}</div>
        <div className="font-light text-gray-600 ">{subtitle}</div>
      </div>

      <div className="flex fx-row items-center gap-4">
            <div className="w-10 h-10 rounded-full border[1px] flex items-center justify-center text-neutral-600 cursor-pointer hover:opacity-80 transition" onClick={onReduce}><AiOutlineMinus /></div>
            <div className="font-light text-xl text-neutral-600">{value}</div>
            <div className="w-10 h-10 rounded-full border[1px] flex items-center justify-center text-neutral-600 cursor-pointer hover:opacity-80 transition" onClick={onAdd}><AiOutlinePlus /></div>

      </div>
    </div>
  );
};

export default Counter;
