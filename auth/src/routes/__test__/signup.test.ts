import request from "supertest";
import { app } from "../../app";

it("returns a 201 on successful signup", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);
});

it("returns a 400 on invalid credentials", async () => {
  // we shopuld either use return or await with jest

  await request(app)
    .post("/api/users/signup")
    .send({
      email: "tesest.com", //bad email
      password: "password",
    })
    .expect(400);
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "word", //bad password
    })
    .expect(400);
});

it("desallows duplicate emails", async () => {
  // we shopuld either use return or await with jest

  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@est.com",
      password: "password",
    })
    .expect(201);
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@est.com", //duplicate email
      password: "password",
    })
    .expect(400);
});

it("sets cookie header", async () => {
  // we should either use return or await with jest

  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@est.com",
      password: "password",
    })
    .expect(201);
  expect(response.get("Set-Cookie")).toBeDefined();
});
