// "use client";
// import React from "react";
// import { IconType } from "react-icons";

// interface categoryinputprops {
//   label: string;
//   onClick: (value: string) => void;
//   icon: IconType;
//   selected?: boolean;
// }
// const CategoryInput: React.FC<categoryinputprops> = ({
//   label,
//   icon: Icon,
//   selected,
//   onClick,
// }) => {
//   return (
//     <div
//       className={`rounded-xl border-2 p-4 flex flex-col  hover:border-black transition cursor-pointer ${
//         selected ? "border-black" : "border-neutral-500"
//       }`}
//     >
//       <Icon size={"30"} />
//       <div className="font-semibold">{label}</div>
//     </div>
//   );
// };

// export default CategoryInput;
"use client";
import React from "react";
import { IconType } from "react-icons";

interface CategoryInputProps {
  label: string;
  onClick: (value: string) => void;
  icon: IconType;
  selected?: boolean;
}

const CategoryInput: React.FC<CategoryInputProps> = ({
  label,
  icon: Icon,
  selected,
  onClick,
}) => {
  return (
    <div
      onClick={() => {
        console.log("Category clicked:", label); // Debugging log
        onClick(label);
      }}
      className={`rounded-xl border-2 p-4 flex flex-col hover:border-black transition cursor-pointer ${
        selected ? "border-black" : "border-neutral-500"
      }`}
    >
      <Icon size={"30"} />
      <div className="font-semibold">{label}</div>
    </div>
  );
};

export default CategoryInput;

