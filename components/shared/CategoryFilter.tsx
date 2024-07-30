"use client";

import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ICategory } from "@/types";
import { getCategories } from "@/lib/services/category";
import toast from "react-hot-toast";

const CategoryFilter = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    getCategories()
      .then((response) => {
        setCategories(response);
      })
      .catch((error) => toast(error.message));
  }, []);

  const onSelectCategory = (category: string) => {
    const params = new URLSearchParams(searchParams);
    if (category !== "All") {
      params.set("category", category);
      replace(`${pathname}?${params.toString()}`, { scroll: false });
    } else {
      params.delete("category");
      replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  };

  return (
    <Select onValueChange={(value: string) => onSelectCategory(value)}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="All" className="select-item p-regular-14">
          All
        </SelectItem>
        {categories.map((category) => (
          <SelectItem
            value={category.name}
            key={category._id}
            className="select-item p-regular-14"
          >
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CategoryFilter;
