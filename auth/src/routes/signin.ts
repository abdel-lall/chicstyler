import express from "express";
import { Request, Response } from "express";
import { body } from "express-validator";
import { User } from "../models/user";
import { validateRequest, BadRequestError } from "@al.chicstyler/common";
import { PasswordManager } from "../services/password-manager";
import jwt from "jsonwebtoken";
const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password").trim().notEmpty().withMessage("Missing password"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existUser = await User.findOne({ email });
    if (!existUser) {
      throw new BadRequestError("Invalid credentials");
    }
    const passwordMatch = await PasswordManager.compare(
      existUser.password,
      password
    );
    if (!passwordMatch) {
      throw new BadRequestError("Invalid credentials");
    }
    const userJwt = jwt.sign(
      {
        id: existUser.id,
        email: existUser.email,
      },
      process.env.JWT_KEY!
    );

    req.session = {
      jwt: userJwt,
    };

    res.status(200).send(existUser);
  }
);

export { router as SigninRouter };
