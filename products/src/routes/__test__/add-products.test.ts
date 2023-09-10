import request from "supertest";
import { app } from "../../app";

it("returns a 400 if the provided request body is not an array of objects", async () => {
  await request(app)
    .post("/api/products/addproducts")
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

it("returns a 400 if any of the provided array objects is missing one  or more properties", async () => {
  await request(app)
    .post("/api/products/addproducts")
    .set("Cookie", global.signin())
    .send([
      {
        name: "Michael Kors",
        brand: "Michael Kors",
        description:
          "Raquel Goldtone Stainless Steel & Crystal Bracelet Watch/41MM",
        category: "watches",
        color: "gold",
        sizes: [{ size: "standard", stock: "11" }],
        image: "cs00119.jpg",
        gender: "women",
        price: 660.6,
      },
      {
        name: "Michael Kors",
        description:
          "MK Empire Goldtone Stainless Steel & Leather Wrap Strap Watch/30MM",
        category: "watches",
        color: "brown",
        sizes: [{ size: "standard", stock: "15" }],
        image: "cs00120.jpg",
        gender: "women",
        price: 190.4,
      },
    ])
    .expect(400);
});

it("returns a 401 if the user is not authenticated", async () => {
  await request(app)
    .post("/api/products/addproducts")
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
