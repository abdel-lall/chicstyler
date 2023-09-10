import mongoose, { Model, Document } from "mongoose";
import { PasswordManager } from "../services/password-manager";

// an interface that describes propreties needed to create a new user
interface IUser {
  email: string;
  password: string;
  name?: string;
  lastName?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  phoneNumber?: string;
  role?: string;
}

// an interface that describes the proprties a user model has
interface IUserModel extends Model<IUserDocument> {
  build(args: IUser): IUserDocument;
}

// an interface that describes the proprties a user Document has
interface IUserDocument extends IUser, Document {}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    default: "",
  },
  lastName: {
    type: String,
    default: "",
  },
  address: {
    type: String,
  },
  city: {
    type: String,
    default: "",
  },
  state: {
    type: String,
  },
  country: {
    type: String,
    default: "",
  },
  phoneNumber: {
    type: String,
    default: "",
  },
  role: {
    type: String,
    default: "customer",
  },
});
// middleware to run befor saving to hash passwords
userSchema.pre("save", async function (done) {
  // this middleware runs everytime I save a user hence the use of
  // isModified to chech is the password is the property that is being modified
  if (this.isModified("password")) {
    const hashedPass = await PasswordManager.toHash(this.get("password"));
    this.set("password", hashedPass);
  }
  done();
});

userSchema.statics.build = (args: IUser) => {
  return new User(args);
};

const User = mongoose.model<IUserDocument, IUserModel>("User", userSchema);

export { User };
