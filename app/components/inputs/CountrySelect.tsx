// "use client";
// import useCountries from "@/app/hooks/useCountries";
// import React from "react";
// import Select from "react-select"
// export type CountrySelectValues = {
//   flag: string;
//   label: string;
//   latlng: number[];
//   region: string;
//   value: string;
// };

// interface CountrySelectProps {
//   value?: CountrySelectValues;
//   onChange: (value: CountrySelectValues) => void;
// }

// const CountrySelect: React.FC<CountrySelectProps> = ({ value, onChange }) => {
//   const { getall } = useCountries();
//     console.log(getall())
//   return (
//     <div>
//       <Select
//         placeholder="Anywhere"
//         isClearable
//         options={getall()}
//         value={value}
//         onChange={(value) => onChange(value as CountrySelectValues)}
//         formatOptionLabel={(option: any) => (
//             <div className="flex flex-row items-center gap-3">
//             <div>{option.flag}</div>
//             <div>
//               {option.label}
//               <span className="text-neutral-800 ml-1">{option.region}</span>
//             </div>
//           </div>
//         )}
//       />
//     </div>
//   );
// };

// export default CountrySelect;

"use client";
import useCountries from "@/app/hooks/useCountries";
import React from "react";
import Select from "react-select";

export type CountrySelectValues = {
  flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string;
};

interface CountrySelectProps {
  value?: CountrySelectValues;
  onChange: (value: CountrySelectValues) => void;
}

const CountrySelect: React.FC<CountrySelectProps> = ({ value, onChange }) => {
  const { getall } = useCountries();
  const options = getall() as CountrySelectValues[];

  return (
    <div>
      <Select
        placeholder="Anywhere"
        isClearable
        options={options}
        value={value}
        onChange={(value) => onChange(value as CountrySelectValues)}
        formatOptionLabel={(option: CountrySelectValues) => (
          <div className="flex flex-row items-center gap-3">
            <div>{option.flag}</div>
            <div>
              {option.label}
              <span className="text-neutral-800 ml-1">{option.region}</span>
            </div>
          </div>
        )}

      theme={(theme)=>({
        ...theme,
        borderRadius:6,
        colors:{
            ...theme.colors,
            primary:'black',
            primary25:'#ffe4e6'
        }
      })}
      />
    </div>
  );
};

export default CountrySelect;

