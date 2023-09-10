import request from "supertest";
import { app } from "../../app";

it("returns a 200 on successful signin with a cookie", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);
  const response = await request(app)
    .post("/api/users/signout")
    .send({})
    .expect(200);
  expect(response.get("Set-Cookie")[0]).toEqual(
    "session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly"
  ); //thats what cookie session is set to when removing it
});
