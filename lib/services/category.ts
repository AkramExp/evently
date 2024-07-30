"use server";
import { Category } from "../database/models/category.model";
import { connectDB } from "../database";
import { revalidatePath } from "next/cache";

export async function addCategory(name: string) {
  try {
    await connectDB();

    const findCategory = await Category.findOne({ name: name });

    if (findCategory) throw new Error("Category Already Exists");

    const newCategory = await Category.create({ name: name });

    revalidatePath("/events/create");

    return JSON.parse(
      JSON.stringify({
        message: "Category Added Successfully",
        data: newCategory,
      })
    );
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function getCategories() {
  try {
    await connectDB();

    const categories = await Category.find().sort({ createdAt: -1 });

    return JSON.parse(JSON.stringify(categories));
  } catch (error: any) {
    throw Error(error.message);
  }
}

export async function getCategoryByName(name: string) {
  try {
    await connectDB();

    const category = await Category.findOne({ name });

    return JSON.parse(JSON.stringify(category));
  } catch (error: any) {
    throw Error(error.message);
  }
}
