import express from "express";
import { Request, Response } from "express";
import { Product } from "../models/product";
import {
  validateRequest,
  requireAuth,
  BadRequestError,
} from "@al.chicstyler/common";
import { validateAddProductsArray } from "../services/validate-add-products-array";
import { IProduct } from "../models/product";

const router = express.Router();

router.post(
  "/api/products/addproducts",
  requireAuth,
  validateAddProductsArray(),
  validateRequest,
  async (req: Request, res: Response) => {
    const products = req.body.map((product: IProduct) => {
      const {
        name,
        brand,
        description,
        category,
        color,
        sizes,
        price,
        image,
        gender,
      } = product;

      const data = {
        name,
        brand,
        description,
        category,
        color,
        sizes,
        price,
        image: `${process.env.BUCKET_URI}/${image}`,
        gender,
      };
      return data;
    });

    const productsAdded = await Product.insertMany(products);

    if (!productsAdded) {
      throw new BadRequestError("error saving products");
    }

    res.status(200).send(productsAdded);
  }
);

export { router as addProducts };
