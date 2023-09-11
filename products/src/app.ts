import express from "express";
import cookieSession from "cookie-session";
import "express-async-errors";
import { json } from "body-parser";
import {
  errorHandler,
  NotFoundError,
  currentUser,
} from "@al.chicstyler/common";
import { addProducts } from "./routes/add-products";
import { getProducts } from "./routes/get-products";
import { addProduct } from "./routes/add-product";
import { updateProduct } from "./routes/update-product";
import { getProduct } from "./routes/get-product";

const app = express();
app.set("trust proxy", true); // to let express know it's behiend a proxy
app.use(json());
app.use(
  cookieSession({
    signed: false, // this option is to set incryption to false JWT is already increpted
    secure: false,
    // secure: process.env.NODE_ENV !== "test", // this is set to work only whith https connection
    //the process.env.NODE_ENV !== "test" returns false if in test env thus accept http
  })
);
app.use(currentUser);

app.use(addProducts);
app.use(getProducts);
app.use(getProduct);
app.use(addProduct);
app.use(updateProduct);

app.all("*", () => {
  throw new NotFoundError();
});
app.use(errorHandler);

export { app };
