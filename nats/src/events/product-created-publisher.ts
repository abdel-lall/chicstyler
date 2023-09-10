import {
  Publisher,
  Subjects,
  ProductCreatedEvent,
} from "@al.chicstyler/common";

export class ProductCreatedPublisher extends Publisher<ProductCreatedEvent> {
  subject: Subjects.ProductCreated = Subjects.ProductCreated;
}
