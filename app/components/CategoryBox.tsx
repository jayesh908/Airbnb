"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";
import { IconType } from "react-icons";
import qs from "query-string";

interface CategoryBoxProps {
  label: string;
  description: string;
  icon: IconType;
  selected?: boolean;
}

const MAX_NESTING_LEVEL = 3;

const sanitizeAndLimitNesting = (query: Record<string, any>, level: number = 0) => {
  if (level > MAX_NESTING_LEVEL) {
    return {};
  }
  const sanitizedQuery: Record<string, any> = {};
  for (const [key, value] of Object.entries(query)) {
    if (typeof value === 'string') {
      sanitizedQuery[key] = value;
    } else if (typeof value === 'object' && value !== null) {
      sanitizedQuery[key] = sanitizeAndLimitNesting(value, level + 1);
    }
  }
  return sanitizedQuery;
};

const CategoryBox: React.FC<CategoryBoxProps> = ({
  label,
  description,
  icon: Icon,
  selected,
}) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};
    if (params) {
      currentQuery = qs.parse(params.toString());
      console.log(currentQuery)
    }

    currentQuery = sanitizeAndLimitNesting(currentQuery);

    const updatedQuery: any = {
      ...currentQuery,
      category: label,
    };

    if (params?.get('category') === label) {
      delete updatedQuery.category;
    }

    const url = qs.stringifyUrl(
      {
        url: '/',
        query: updatedQuery,
      },
      { skipNull: true }
    );
    router.push(url);
  }, [label, params, router]);

  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-500 transition cursor-pointer
        ${selected ? "border-b-neutral-800" : "border-transparent"}
        ${selected ? "text-neutral-800" : "text-neutral-500"}
      `}
      onClick={handleClick}
    >
      <Icon size={26} />
      <div className="font-medium text-sm">{label}</div>
    </div>
  );
};

export default CategoryBox;
