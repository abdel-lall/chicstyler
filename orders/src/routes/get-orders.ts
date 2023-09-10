import { Order } from "../models/order";
import express, { Request, Response } from "express";
import { NotFoundError } from "@al.chicstyler/common";

const router = express.Router();

router.get("/api/orders/getorders", async (req: Request, res: Response) => {
  const allOrders = await Order.find({});
  if (!allOrders) {
    throw new NotFoundError();
  }
  res.status(200).send(allOrders);
});

export { router as getOrders };
