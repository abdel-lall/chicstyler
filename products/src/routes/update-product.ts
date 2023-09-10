import express from "express";
import { Request, Response } from "express";
import { Product } from "../models/product";
import {
  validateRequest,
  requireAuth,
  BadRequestError,
} from "@al.chicstyler/common";
import { validateAddProduct } from "../services/validate-add-product";

const router = express.Router();

router.post(
  "/api/products/updateproduct/:id",
  requireAuth,
  validateAddProduct(),
  validateRequest,
  async (req: Request, res: Response) => {
    const productId = req.params.id;
    const productData = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      productData,
      {
        new: true, // To return the updated product
      }
    );

    if (!updatedProduct) {
      throw new BadRequestError("error updating the product");
    }

    res.status(200).send(updatedProduct);
  }
);

export { router as updateProduct };
