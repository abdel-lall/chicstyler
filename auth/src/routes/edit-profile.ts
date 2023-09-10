import express, { Request, Response } from "express";
import { User } from "../models/user";
import { currentUser, BadRequestError } from "@al.chicstyler/common";

const router = express.Router();

router.post(
  "/api/users/editprofile",
  currentUser,
  async (req: Request, res: Response) => {
    const updateObject: { [key: string]: string } = {};

    const propertiesToUpdate = [
      "email",
      "password",
      "name",
      "lastName",
      "address",
      "city",
      "state",
      "country",
      "phoneNumber",
    ];

    // Check if the property exists in the request body
    for (const property of propertiesToUpdate) {
      if (req.body[property] !== undefined) {
        updateObject[property] = req.body[property];
      }
    }

    const updatedProfile = await User.findByIdAndUpdate(
      req.currentUser?.id,
      updateObject,
      { new: true }
    );
    if (!updatedProfile) {
      throw new BadRequestError("user not found");
    }
    res.status(200).send(updatedProfile);
  }
);

export { router as EditProfileRouter };
