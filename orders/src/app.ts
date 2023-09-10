import express from "express";
import cookieSession from "cookie-session";
import "express-async-errors";
import { json } from "body-parser";
import {
  errorHandler,
  NotFoundError,
  currentUser,
} from "@al.chicstyler/common";
import { addOrder } from "./routes/add-order";
import { updateOrder } from "./routes/update-order";
import { getOrder } from "./routes/get-order";
import { getOrders } from "./routes/get-orders";
import { deleteOrder } from "./routes/delete-order";

const app = express();
app.set("trust proxy", true); // to let express know it's behiend a proxy
app.use(json());
app.use(
  cookieSession({
    signed: false, // this option is to set incryption to false JWT is already increpted
    secure: process.env.NODE_ENV !== "test", // this is set to work only whith https connection
    //the process.env.NODE_ENV !== "test" returns false if in test env thus accept http
  })
);
app.use(currentUser);

app.use(getOrder);
app.use(getOrders);
app.use(addOrder);
app.use(updateOrder);
app.use(deleteOrder);

app.all("*", () => {
  throw new NotFoundError();
});
app.use(errorHandler);

export { app };
