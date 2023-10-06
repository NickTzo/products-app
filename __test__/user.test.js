const mongoose = require('mongoose');
const request = require('supertest');
const helper = require('../helpers/user.helper');           //τα δοκιμαστικα στοιχεια που χρειαζομαστε

const app = require('../index');
require("dotenv").config();                         // τα στοιχεια της βασης

beforeEach(async () => {
  await mongoose.connect(process.env.MONGODB_URI);   //πριν απο καθε τεστ κανε συνδεση με την βαση
});

afterEach(async () => {
  await mongoose.connection.close();                     // μετα απο καθε τεστ κοψε την συνδεση με την βαση
});

describe("Check User's route requests", () => {
  it("Get all users", async () => {
    const res = await request(app)
      .get('/api/users');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBeTruthy();
    expect(res.body.data.length).toBeGreaterThan(0);
  }, 10000);

  it("Get a user", async () => {

    const result = await helper.findLastInsertedUser();

    const res = await request(app)
      .get('/api/users/' + result.username);

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBeTruthy();
    expect(res.body.data.username).toBe(result.username);
    expect(res.body.data.email).toBe(result.email);
  }, 10000);

  it("Post create a user", async () => {
    const res = await request(app)
      .post('/api/users')
      .send({
        username: "test4",
        password: "12345",
        name: "name for test4",
        surname: "surname for test4",
        email: "test4@aueb.gr"
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBeTruthy();
  }, 10000);

  it("Post create user that already exists", async () => {

    const result = await helper.findLastInsertedUser();

    const res = await request(app)
      .post('/api/users/' + result.username)
      .send({
        username: result.username,
        password: "111111",
        name: "new name",
        surname: "new surname",
        email: "new@aueb.gr"
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.status).toBeFalsy();
  }, 10000);

  it("Patch update a user", async () => {

    const result = await helper.findLastInsertedUser();

    const res = await request(app)
      .patch("/api/users/" + result.username)
      .send({
        username: result.username,
        name: "new updated name",
        surname: "new updated surname",
        email: "newupdated@aueb.gr",
        address: {
          area: "xxxx",
          road: "xxxx"
        },
        phone: [
          {
            type: "mobile",
            number: "11111"
          }
        ]
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBeTruthy();
  }, 10000);

  it("Delete a user", async () => {
    const result = await helper.findLastInsertedUser();

    const res = await request(app)
      .delete('/api/users/' + result.username);
    expect(res.statusCode).toBe(200);
  }, 10000)
});