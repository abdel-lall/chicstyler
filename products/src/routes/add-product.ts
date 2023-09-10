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
  "/api/products/addproduct",
  requireAuth,
  validateAddProduct(),
  validateRequest,
  async (req: Request, res: Response) => {
    const productData = req.body;

    const newProduct = new Product(productData);
    const savedProduct = await newProduct.save();

    if (!savedProduct) {
      throw new BadRequestError("error saving the product");
    }

    res.status(200).send(savedProduct);
  }
);

export { router as addProduct };
