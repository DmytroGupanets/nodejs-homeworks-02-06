const authenticate = require("./authenticate")
const jwtoken = require("jsonwebtoken")
const { SECRET_KEY, TEST_USER_EMAIL, TEST_USER_PASSWORD, TEST_USER_ID } =
  process.env
const { User } = require("../models")

jest.spyOn(User, "findById").mockReturnValueOnce({
  _id: TEST_USER_ID,
  email: TEST_USER_EMAIL,
  subscription: "starter",
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNWVjYjcwYWFlN2MwZDQ5MTk3MzgwMCIsImlhdCI6MTYzMzYwMjY3NCwiZXhwIjoxNjMzNjA2Mjc0fQ.reo63A2K73GwPIsoeLE5a_nUUo_7zhV4oHo6-3_k61w",
  password: TEST_USER_PASSWORD,
  avatarURL: "/avatars/user_avatar-image_615471453f19984d91ca2318.jpg"
})

describe("Unit test", () => {
  let req, res, next

  const testToken = jwtoken.sign(TEST_USER_ID, SECRET_KEY)

  beforeEach(() => {
    (req = {
      headers: {
        authorization: `Bearer ${testToken}`
      }
    }),
    (res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn((data) => data)
    }),
    (next = jest.fn())
  })

  test("should pass authentication test", async () => {
    await authenticate(req, res, next)

    expect(next).toBeCalled()
  })

  test("should get error if user not authorized", async () => {
    const result = await authenticate({}, res, next)

    expect(result).toBeDefined()
    expect(result).toHaveProperty("status", "Unauthorized")
    expect(result).toHaveProperty("code", 401)
    expect(result.data).toHaveProperty("message", "Not authorized")
  })

  test("should get error if authorization header in wrong format", async () => {
    const req = {
      headers: {
        authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNWVjYjcwYWFlN2MwZDQ5MTk3MzgwMCIsImlhdCI6MTYzMzYwMjY3NCwiZXhwIjoxNjMzNjA2Mjc0fQ.reo63A2K73GwPIsoeLE5a_nUUo_7zhV4oHo6-3_k61w"
      }
    }
    const result = await authenticate(req, res, next)

    expect(result).toBeDefined()
    expect(result).toHaveProperty("status", "Unauthorized")
    expect(result).toHaveProperty("code", 401)
    expect(result.data).toHaveProperty("message", "Not authorized")
  })

  test("should get error if user did not received token", async () => {
    jest.spyOn(User, "findById").mockReturnValueOnce({
      _id: TEST_USER_ID,
      email: TEST_USER_EMAIL,
      subscription: "starter",
      password: TEST_USER_PASSWORD,
      avatarURL: "/avatars/user_avatar-image_615471453f19984d91ca2318.jpg"
    })

    const result = await authenticate(req, res, next)

    expect(result).toBeDefined()
    expect(result).toHaveProperty("status", "Unauthorized")
    expect(result).toHaveProperty("code", 401)
    expect(result.data).toHaveProperty("message", "Not authorized")
  })
})
