import { Category } from "@/lib/database/models/category.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { name } = await request.json();

    const findCategory = await Category.findOne({ name: name.toLowerCase() });

    if (findCategory)
      return NextResponse.json({ error: "Category Already Exists" });

    const newCategory = await Category.create({ name: name.toLowerCase() });

    return NextResponse.json({
      status: 200,
      newCategory,
      message: "Category Added Successfully",
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 400 });
  }
}
