import nats from "node-nats-streaming";
import { ProductCreatedListener } from "./events/product-created-listener";
import { randomBytes } from "crypto";
console.clear();

const stan = nats.connect("chicstyler", randomBytes(4).toString("hex"), {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("listener was connect to nats");
  stan.on("close", () => {
    console.log("nats connection closed");
    process.exit();
  });
  new ProductCreatedListener(stan).listen();
});
