import mongoose, { Model, Document } from "mongoose";

export enum OrderStatus {
  Pending = "Pending",
  Processing = "Processing",
  Shipped = "Shipped",
  Delivered = "Delivered",
  Canceled = "Canceled",
}
interface productInterface {
  id: mongoose.Types.ObjectId;
  size: string;
  quantity: number;
}

export interface IOrder {
  orderNumber?: number;
  costomerId?: mongoose.Types.ObjectId;
  products: productInterface[];
  totalPrice: number;
  orderDate?: Date;
  status?: OrderStatus;
}

interface IOrderDocument extends IOrder, Document {}

interface IOrderModel extends Model<IOrderDocument> {
  build(args: IOrder): IOrderDocument;
}

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: Number,
      unique: true,
      default: 0,
    },
    costomerId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    products: [
      {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },
        size: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          require: true,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    orderDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Canceled"],
      default: "Pending",
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

orderSchema.pre("save", async function (done) {
  // this middleware runs everytime to increment the ordernumber

  if (!this.orderNumber) {
    const latestOrder = await Order.findOne().sort("-orderNumber");
    if (latestOrder && latestOrder.orderNumber !== undefined) {
      this.orderNumber = latestOrder.orderNumber + 1;
    } else {
      this.orderNumber = 1;
    }
  }
  done();
});

orderSchema.statics.build = (args: IOrder) => {
  return new Order(args);
};

const Order = mongoose.model<IOrderDocument, IOrderModel>("Order", orderSchema);

export { Order };
