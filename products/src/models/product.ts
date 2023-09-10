import mongoose, { Model, Document } from "mongoose";

export interface IProduct {
  name: string;
  brand: string;
  description: string;
  category: string;
  color: string;
  sizes: { size: string; stock: string }[];
  price: number;
  image: string;
  gender: string;
}

interface IProductDocument extends IProduct, Document {}

interface IProductModel extends Model<IProductDocument> {
  build(args: IProduct): IProductDocument;
}

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    sizes: {
      type: Array,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

productSchema.statics.build = (args: IProduct) => {
  return new Product(args);
};
const Product = mongoose.model<IProductDocument, IProductModel>(
  "Product",
  productSchema
);

export { Product };
