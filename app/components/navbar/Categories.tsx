"use client";
import React from "react";
import Container from "../Container";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";
import { FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";

export const categories = [
  {
    label: "beach",
    icon: TbBeach,
    description: "This property close to the beach",
  },
  {
    label: "Windmillls",
    icon: GiWindmill,
    description: "This property has the windmills",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description: "This property is modern",
  },
  {
    label: "CountrySide",
    icon: TbMountain,
    description: "This property is modern",
  },
  {
    label: "Pools",
    icon: TbPool,
    description: "This property is modern",
  },
  {
    label: "Islands",
    icon: GiIsland,
    description: "This property is close to islands",
  },
  {
    label: "lake",
    icon: GiBoatFishing,
    description: "This property id close to lake",
  },
  {
    label: "Skiing",
    icon: FaSkiing,
    description: "This property has skiing",
  },
  {
    label: "Castle",
    icon: GiCastle,
    description: "This property is in a castle",
  },
  {
    label: "Camping",
    icon: GiForestCamp,
    description: "This property has a camping activities",
  },
  {
    label: "Artic",
    icon: BsSnow,
    description: "This property has a camping activities",
  },
  {
    label: "cave",
    icon: GiCaveEntrance,
    description: "This property is in a cave",
  },
  {
    label: "Desert",
    icon: GiCactus,
    description: "This property is in Desert",
  },
  {
    label: "Barns",
    icon: GiBarn,
    description: "This property is in barns",
  },
  {
    label: "Lux",
    icon: IoDiamond,
    description: "This property is Luxirious",
  },
];

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();

  const isMainpage = pathname === "/";
  if (!isMainpage) {
    return null;
  }

  return (
    <Container>
      <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={category === item.label}
            description={item.description}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
