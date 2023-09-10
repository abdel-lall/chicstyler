import request from "supertest";
import { app } from "../../app";

it("returns a 400 if the provided id is not existant in the data base", async () => {
  const id = "75568425655";
  await request(app)
    .get(`/api/products/getproduct/${id}`)
    .set("Cookie", global.signin())
    .expect(400);
});
