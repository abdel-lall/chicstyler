import nats from "node-nats-streaming";
import { ProductCreatedPublisher } from "./events/product-created-publisher";
console.clear();
// creating a client
const stan = nats.connect("chicstyler", "abc", {
  url: "http://localhost:4222",
});

stan.on("connect", async () => {
  const data = {
    id: "123",
    name: "dress",
    price: 30,
  };
  try {
    await new ProductCreatedPublisher(stan).publish(data);
  } catch (err) {
    console.log(err);
  }
});
