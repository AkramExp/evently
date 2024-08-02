"use server";

import {
  GetOrdersByEventParams,
  GetOrdersByUserParams,
} from "./../../types/index";

import { CheckoutOrderParams, CreateOrderParams } from "@/types";
import { redirect } from "next/navigation";
import { connectDB } from "../database";
import Order from "../database/models/order.model";
import mongoose from "mongoose";
import { Event } from "../database/models/event.model";
import { User } from "../database/models/user.model";

export const checkoutOrder = async (order: CheckoutOrderParams) => {
  try {
    const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

    const price = order.isFree ? 0 : Number(order.price);

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: price,
            product_data: {
              name: order.eventTitle,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        eventId: order.eventId,
        buyerId: order.buyerId,
      },
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/events/my-events`,
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
    });
    redirect(session.url);
  } catch (error) {
    throw error;
  }
};

export const createOrder = async (order: CreateOrderParams) => {
  try {
    await connectDB();

    const newOrder = await Order.create({
      ...order,
      event: order.eventId,
      buyer: order.buyerId,
    });

    return JSON.parse(JSON.stringify(newOrder));
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getOrderByEvent = async ({
  searchString,
  eventId,
}: GetOrdersByEventParams) => {
  try {
    await connectDB();

    if (!eventId) throw new Error("Event Id is Required");

    const orders = await Order.aggregate([
      {
        $match: {
          $and: [
            { eventId: new mongoose.Types.ObjectId(eventId) },
            { buyer: { $regex: RegExp(searchString, "i") } },
          ],
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "buyer",
          foreignField: "_id",
          as: "buyer",
        },
      },
      {
        $unwind: "$buyer",
      },
      {
        $lookup: {
          from: "events",
          localField: "event",
          foreignField: "_id",
          as: "event",
        },
      },
      {
        $unwind: "$event",
      },
      {
        $project: {
          _id: 1,
          totalAmount: 1,
          createdAt: 1,
          eventTitle: "$event.title",
          eventId: "$event._id",
          buyer: "$buyer.name",
        },
      },
    ]);

    return JSON.parse(JSON.stringify(orders));
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getOrderByUser = async ({
  userId,
  limit = 3,
  page,
}: GetOrdersByUserParams) => {
  try {
    await connectDB();

    const skipAmount = (Number(page) - 1) * limit;

    const condition = { buyer: userId };

    const orders = await Order.distinct("event._id")
      .find(condition)
      .skip(skipAmount)
      .limit(limit)
      .populate({
        path: "event",
        model: Event,
        populate: { path: "organizer", model: User, select: "_id name" },
      });

    const ordersCount = await Order.distinct("event._id").countDocuments(
      condition
    );

    return {
      data: JSON.parse(JSON.stringify(orders)),
      totalPages: Math.ceil(ordersCount / limit),
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
};
