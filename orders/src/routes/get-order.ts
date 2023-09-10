import { Order } from "../models/order";
import express, { Request, Response } from "express";
import { NotFoundError, BadRequestError } from "@al.chicstyler/common";
import mongoose from "mongoose";

const router = express.Router();

router.get("/api/orders/getorder/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new BadRequestError("id should be of type mongoose object");
  }

  const orderById = await Order.findById(id);

  if (!orderById) {
    throw new NotFoundError();
  }
  res.status(200).send(orderById);
});

export { router as getOrder };
