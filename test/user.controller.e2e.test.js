const request = require("supertest");
const app = require("../app");

describe("user authentication", () => {
  it("should response with status 200", async () => {
    const body = {
      email: "topuser@mail.ru",
      password: "123456",
    };

    const res = await request(app)
      .post("/api/auth/signin")
      .send(body)
      .set("Accept", "application/json");

    expect(res.status).toEqual(200);
    expect(res.body.status).toEqual("Login success");
    expect(res.body.code).toEqual(200);

    expect(res.body.data.token).toBeDefined();
    expect(res.body.data.user.email).toEqual("topuser@mail.ru");
    expect(res.body.data.user.subscription).toEqual("starter");
  });

  it("should response with status 401 if password invalid", async () => {
    const body = {
      email: "topuser@mail.ru",
      password: "123",
    };

    const res = await request(app)
      .post("/api/auth/signin")
      .send(body)
      .set("Accept", "application/json");

    expect(res.status).toEqual(401);
    expect(res.body.status).toEqual("Unauthorized");
    expect(res.body.code).toEqual(401);

    expect(res.body.data.message).toEqual("Email or password is wrong");
  });

  it("should response with status 400 if password field is empty", async () => {
    const body = {
      email: "topuser@mail.ru",
      password: "",
    };

    const res = await request(app)
      .post("/api/auth/signin")
      .send(body)
      .set("Accept", "application/json");

    expect(res.status).toEqual(400);
    expect(res.body.status).toEqual("Bad request");
    expect(res.body.code).toEqual(400);

    expect(res.body.data.message).toEqual(
      '"password" is not allowed to be empty'
    );
  });
});
