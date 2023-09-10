import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

// to avoid typescript yelling
let mongod: any;

declare global {
  var signin: () => string[];
}

// jest hook that runs once before all tests in this case to setup the in memory mongo db server
beforeAll(async () => {
  process.env.JWT_KEY = "asdfasdf";

  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();

  await mongoose.connect(uri, {});
});

//jest hook that runs befor each test in this case it is used to clean the data
beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});
// jest hook that runs once after all the tests  using it to stop the in memory server
afterAll(async () => {
  if (mongod) {
    await mongod.stop();
  }
  await mongoose.connection.close();
});

global.signin = () => {
  const payload = {
    id: "11223355355",
    email: "abdel@gmail.com",
  };
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  const session = { jwt: token };

  const sessionJson = JSON.stringify(session);

  const base64session = Buffer.from(sessionJson).toString("base64");

  return [`session=${base64session}`];
};
