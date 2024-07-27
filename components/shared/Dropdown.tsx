import React, { startTransition, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "../ui/input";
import { addCategory, getCategories } from "@/lib/services/category";
import toast from "react-hot-toast";
import { ICategory } from "@/types";

type DropdownProps = {
  onChangeHandler: () => void;
  value: string;
};

const Dropdown = ({ onChangeHandler, value }: DropdownProps) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    getCategories()
      .then((response) => {
        setCategories(response);
      })
      .catch((error) => toast(error.message));
  }, []);

  function handleAddCategory() {
    if (newCategory.trim() === "") return;

    setIsAdding(true);

    addCategory(newCategory)
      .then((response) => {
        toast(response.message);

        setCategories((categories: any) => [...categories, response.data]);
      })
      .catch((error) => toast(error.message))
      .finally(() => setIsAdding(false));
  }

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        {categories &&
          categories.length > 0 &&
          categories.map((category: { _id: string; name: string }) => (
            <SelectItem
              key={category._id}
              value={category._id}
              className="select-item p-regular-14"
            >
              {category.name}
            </SelectItem>
          ))}
        <AlertDialog>
          <AlertDialogTrigger className="p-medium-14 flex w-full rounded-sm py-3 pl-8 text-primary-500 hover:bg-primary-50 focus-within:text-primary-500">
            Add Category +
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
              <AlertDialogTitle>New Category</AlertDialogTitle>
              <AlertDialogDescription>
                <Input
                  type="text"
                  placeholder="Category Name"
                  className="input-field mt-3"
                  onChange={(e) => setNewCategory(e.target.value)}
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => startTransition(handleAddCategory)}
                disabled={isAdding}
                className="disabled:cursor-not-allowed"
              >
                Add
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SelectContent>
    </Select>
  );
};

export default Dropdown;
