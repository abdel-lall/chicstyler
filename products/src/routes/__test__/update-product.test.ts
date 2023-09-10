import request from "supertest";
import { app } from "../../app";

it("returns a 400 the provided id is not existant in the data base", async () => {
  const id = "75568425655";
  await request(app)
    .post(`/api/products/updateproduct/${id}`)
    .set("Cookie", global.signin())
    .send({
      name: "Michael Kors",
      brand: "Michael Kors",
      description:
        "MK Empire Goldtone Stainless Steel & Leather Wrap Strap Watch/30MM",
      category: "watches",
      color: "brown",
      sizes: [{ size: "standard", stock: "15" }],
      image: "cs00120.jpg",
      gender: "women",
      price: 190.4,
    })
    .expect(400);
});

it("returns a 401 if the user is not authenticated", async () => {
  const response = await request(app)
    .get(`/api/products/addproduct`)
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
    ]);
  await request(app)
    .post(`/api/products/updateproduct/${response.body.id}`)
    .send([
      {
        name: "Givenchy",
        brand: "Givenchy",
        description:
          "Raquel Goldtone Stainless Steel & Crystal Bracelet Watch/41MM",
        category: "watches",
        color: "gold",
        sizes: [{ size: "standard", stock: "11" }],
        image: "cs00119.jpg",
        gender: "women",
        price: 660.6,
      },
    ])
    .expect(401);
});

it("returns a 400 if any of the proprieties in the update request is missing", async () => {
  const response = await request(app)
    .get(`/api/products/addproduct`)
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
    ]);
  await request(app)
    .post(`/api/products/updateproduct/${response.body.id}`)
    .set("Cookie", global.signin())
    .send([
      {
        brand: "Givenchy",
        description:
          "Raquel Goldtone Stainless Steel & Crystal Bracelet Watch/41MM",
        category: "watches",
        color: "gold",
        sizes: [{ size: "standard", stock: "11" }],
        image: "cs00119.jpg",
        gender: "women",
        price: 660.6,
      },
    ])
    .expect(400);
});
