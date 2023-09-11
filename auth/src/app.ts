import express from "express";
import cookieSession from "cookie-session";
import "express-async-errors";
import { json } from "body-parser";
import { CurrentUserRouter } from "./routes/current-user";
import { SigninRouter } from "./routes/signin";
import { SignoutRouter } from "./routes/signout";
import { SignupRouter } from "./routes/signup";
import { EditProfileRouter } from "./routes/edit-profile";
import { errorHandler, NotFoundError } from "@al.chicstyler/common";

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

app.use(CurrentUserRouter);
app.use(SignupRouter);
app.use(SigninRouter);
app.use(SignoutRouter);
app.use(EditProfileRouter);
app.all("*", () => {
  throw new NotFoundError();
});
app.use(errorHandler);

export { app };
