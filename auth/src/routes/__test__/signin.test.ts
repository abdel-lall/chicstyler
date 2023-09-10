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
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(200);

  expect(response.get("Set-Cookie")).toBeDefined();
});

it("returns a 400 on wrong email or wrong password", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  await request(app)
    .post("/api/users/signin")
    .send({
      email: "tes@test.com", // wrong email
      password: "password",
    })
    .expect(400);
  await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com", // wrong password
      password: "pass",
    })
    .expect(400);
});
it("returns a 400 on not existing account", async () => {
  await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(400);
});
