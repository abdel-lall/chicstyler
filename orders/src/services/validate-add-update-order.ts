const { body } = require("express-validator");
import mongoose from "mongoose";

export const validateAddUpdateOrder = () => {
  return [
    body("products")
      .isArray({ min: 1 }) // Check that products is an array and not empty
      .custom((value: any[]) => {
        for (const product of value) {
          if (
            typeof product !== "object" || // Check if each product is an object
            !product.hasOwnProperty("id") || // Check for the id property
            !product.hasOwnProperty("size") || // Check for the size property
            !product.hasOwnProperty("quantity") || // Check for the quantity property
            typeof product.id !== "string" || // Check if id is a string
            typeof product.size !== "string" || // Check if size is a string
            typeof product.quantity !== "number" || // Check if quantity is a number
            !mongoose.Types.ObjectId.isValid(product.id) // Check if id is a valid ObjectId
          ) {
            if (typeof product !== "object") {
              throw new Error("Each product should be an object");
            }

            if (!product.hasOwnProperty("id")) {
              throw new Error("Missing property 'id' on a product instance");
            }

            if (!product.hasOwnProperty("size")) {
              throw new Error("Missing property 'size' on a product instance");
            }

            if (!product.hasOwnProperty("quantity")) {
              throw new Error(
                "Missing property 'quantity' on a product instance"
              );
            }

            if (typeof product.id !== "string") {
              throw new Error("Each product 'id' should be a string");
            }

            if (typeof product.size !== "string") {
              throw new Error("Each product 'size' should be a string");
            }

            if (typeof product.quantity !== "number") {
              throw new Error("Each product 'quantity' should be a number");
            }

            if (!mongoose.Types.ObjectId.isValid(product.id)) {
              throw new Error("Product 'id' is not valid");
            }
          }
        }
        return true;
      }),
    body("totalPrice").notEmpty().isNumeric(),
  ];
};
