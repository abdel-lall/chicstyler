import { Order } from "../models/order";
import express, { Request, Response } from "express";

import { validateRequest, BadRequestError } from "@al.chicstyler/common";
import { validateAddUpdateOrder } from "../services/validate-add-update-order";

const router = express.Router();

router.post(
  "/api/orders/addorder",
  validateAddUpdateOrder(),
  validateRequest,
  async (req: Request, res: Response) => {
    const orderData = req.body;

    const newOrder = new Order(orderData);
    const savedOrder = await newOrder.save();

    if (!savedOrder) {
      throw new BadRequestError("error saving the order");
    }

    res.status(200).send(savedOrder);
  }
);

export { router as addOrder };
