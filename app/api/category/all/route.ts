import { Category } from "@/lib/database/models/category.model";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const categories = await Category.find();

    return NextResponse.json({
      status: 200,
      data: categories,
      message: "Categories Fetched Successfully",
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 400 });
  }
}
