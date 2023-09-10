import { Order } from "../models/order";
import express, { Request, Response } from "express";
import { validateRequest, BadRequestError } from "@al.chicstyler/common";
import { validateAddUpdateOrder } from "../services/validate-add-update-order";
import mongoose from "mongoose";

const router = express.Router();

router.post(
  "/api/orders/updateorder/:id",
  validateAddUpdateOrder(),
  validateRequest,
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { products, totalPrice } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestError("id should be of type mongoose object");
    }

    const order = await Order.findById(id);

    if (!order) {
      throw new BadRequestError("order not found");
    }

    order.products = products;
    order.totalPrice = totalPrice;
    await order.save();

    res.status(200).send(order);
  }
);

export { router as updateOrder };
