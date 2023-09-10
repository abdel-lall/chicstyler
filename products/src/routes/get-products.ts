import express from "express";
import { Request, Response } from "express";
import { Product } from "../models/product";
import { BadRequestError } from "@al.chicstyler/common";

const router = express.Router();

router.get("/api/products/getproducts", async (req: Request, res: Response) => {
  const foundProducts = await Product.find({});
  if (!foundProducts) {
    throw new BadRequestError("products not found");
  }

  res.status(200).send(foundProducts);
});

export { router as getProducts };
