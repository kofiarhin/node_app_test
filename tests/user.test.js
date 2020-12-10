const app = require("../server/app");
const mongoose = require("mongoose");
const User = require("../server/model/user");
const request = require("supertest");

const userOne = {
  name: "kofi arhin",
  email: "kofiarhin@gmail.com",
  password: "password",
};

beforeEach(async () => {
  await User.deleteMany();
  await new User(userOne).save();
});

afterAll(async () => {
  await mongoose.connection.close();
});

// create user
test("create user", async () => {
  const response = await request(app)
    .post("/users")
    .send({
      name: "lebron james",
      email: "lebron@gmail.com",
      password: "password123",
    })
    .expect(201);
});

// login user
test("login user", async () => {
  const response = await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);

  expect(response.header).toHaveProperty("authorization");
});

test("cannot login user with invalid credentials", async () => {
  const response = await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: "x",
    })
    .expect(400);
});
