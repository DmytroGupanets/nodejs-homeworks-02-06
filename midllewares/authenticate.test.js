const authenticate = require("./authenticate");
const jwtoken = require("jsonwebtoken");
const { SECRET_KEY } = process.env;
const { User } = require("../models");

jest.spyOn(User, "findById").mockReturnValueOnce({
  _id: "615471453f19984d91ca2318",
  email: "topuser@mail.ru",
  subscription: "starter",
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNTQ3MTQ1M2YxOTk4NGQ5MWNhMjMxOCIsImlhdCI6MTYzMzI0MTUxNSwiZXhwIjoxNjMzMjQ1MTE1fQ.1jcR8nn5i2HjPCg1XILWLiX78V_R0bkqKvH606jZvDc",
  password: "$2a$10$ZvV2madWN2w4VXhSdeHY.OAHgDYKkHVjLzIROf8jH0EB0TQeKaR5W",
  avatarURL: "/avatars/user_avatar-image_615471453f19984d91ca2318.jpg",
});

describe("Unit test", () => {
  let req, res, next;

  const TEST_USER_ID = "615471453f19984d91ca2318";
  const testToken = jwtoken.sign(TEST_USER_ID, SECRET_KEY);

  beforeEach(() => {
    (req = {
      headers: {
        authorization: `Bearer ${testToken}`,
      },
    }),
      (res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn((data) => data),
      }),
      (next = jest.fn());
  });

  test("should pass authentication test", async () => {
    await authenticate(req, res, next);

    expect(next).toBeCalled();
  });

  test("should get error if user not authorized", async () => {
    const result = await authenticate({}, res, next);

    expect(result).toBeDefined();
    expect(result).toHaveProperty("status", "Unauthorized");
    expect(result).toHaveProperty("code", 401);
    expect(result.data).toHaveProperty("message", "Not authorized");
  });

  test("should get error if authorization header in wrong format", async () => {
    const req = {
      headers: {
        authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNTQ3MTQ1M2YxOTk4NGQ5MWNhMjMxOCIsImlhdCI6MTYzMzAxODUwNSwiZXhwIjoxNjMzMDIyMTA1fQ.8skme2CsOiDVSqyyc20CLbeyJwjRITYmgkj_YBJJq_Q",
      },
    };
    const result = await authenticate(req, res, next);

    expect(result).toBeDefined();
    expect(result).toHaveProperty("status", "Unauthorized");
    expect(result).toHaveProperty("code", 401);
    expect(result.data).toHaveProperty("message", "Not authorized");
  });

  test("should get error if user did not received token", async () => {
    jest.spyOn(User, "findById").mockReturnValueOnce({
      _id: "615471453f19984d91ca2318",
      email: "topuser@mail.ru",
      subscription: "starter",
      password: "$2a$10$ZvV2madWN2w4VXhSdeHY.OAHgDYKkHVjLzIROf8jH0EB0TQeKaR5W",
      avatarURL: "/avatars/user_avatar-image_615471453f19984d91ca2318.jpg",
    });

    const result = await authenticate(req, res, next);

    expect(result).toBeDefined();
    expect(result).toHaveProperty("status", "Unauthorized");
    expect(result).toHaveProperty("code", 401);
    expect(result.data).toHaveProperty("message", "Not authorized");
  });
});
