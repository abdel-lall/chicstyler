import request from "supertest";
import { app } from "../../app";

it("response with info about current user", async () => {
  const responseAuth = await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);
  const cookie = responseAuth.get("Set-Cookie");
  const response = await request(app)
    .get("/api/users/currentuser")
    .set("Cookie", cookie)
    .expect(200);
  expect(response.body.currentUser.email).toEqual("test@test.com");
});

it("response with null for non existing current user", async () => {
  const response = await request(app).get("/api/users/currentuser").expect(200);
  expect(response.body.currentUser).toEqual(null);
});
