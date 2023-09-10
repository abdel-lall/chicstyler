import { Message } from "node-nats-streaming";
import { Listener, Subjects, ProductCreatedEvent } from "@al.chicstyler/common";

export class ProductCreatedListener extends Listener<ProductCreatedEvent> {
  subject: Subjects.ProductCreated = Subjects.ProductCreated;
  queueGroupName = "payments-service";
  onMessage(data: ProductCreatedEvent["data"], msg: Message): void {
    console.log(`sequence ${msg.getSequence()} event data: ${data}`);
    msg.ack();
  }
}
