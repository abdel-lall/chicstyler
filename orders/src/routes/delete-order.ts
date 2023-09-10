import { Order } from "../models/order";
import express, { Request, Response } from "express";
import { BadRequestError } from "@al.chicstyler/common";
import mongoose from "mongoose";

const router = express.Router();

router.delete(
  "/api/orders/deleteorder/:id",
  async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestError("id should be of type mongoose object");
    }

    const deletedDocument = await Order.findByIdAndDelete(id);

    if (!deletedDocument) {
      throw new BadRequestError("Order not found");
    }
    res.status(200).send(deletedDocument);
  }
);

export { router as deleteOrder };
