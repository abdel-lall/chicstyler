import express from "express";
import { Request, Response } from "express";
import { Product } from "../models/product";
import { requireAuth, BadRequestError } from "@al.chicstyler/common";

const router = express.Router();

router.get(
  "/api/products/getproduct/:id",
  async (req: Request, res: Response) => {
    const productId = req.params.id;
    const foundProduct = await Product.findById(productId);

    if (!foundProduct) {
      throw new BadRequestError("product not found");
    }
    res.status(200).send(foundProduct);
  }
);

export { router as getProduct };
