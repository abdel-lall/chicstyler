import request from "supertest";
import { app } from "../../app";

it("returns a 400 if the provided request body is missing a property", async () => {
  await request(app)
    .post("/api/products/addproduct")
    .set("Cookie", global.signin())
    .send({
      name: "Michael Kors",
      brand: "Michael Kors",
      description:
        "MK Empire Goldtone Stainless Steel & Leather Wrap Strap Watch/30MM",
      image: "cs00120.jpg",
      gender: "women",
      price: 190.4,
    })
    .expect(400);
});

it("returns a 401 if the user is not authenticated", async () => {
  await request(app)
    .post("/api/products/addproduct")
    .send({
      name: "Michael Kors",
      brand: "Michael Kors",
      description:
        "MK Empire Goldtone Stainless Steel & Leather Wrap Strap Watch/30MM",
      image: "cs00120.jpg",
      gender: "women",
      price: 190.4,
    })
    .expect(401);
});
