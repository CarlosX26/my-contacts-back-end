import request from "supertest"
import AppDataSource from "../../../data-source"
import app from "../../../app"
import { DataSource } from "typeorm"
import { client, clientLogin } from "../../mocks/clients/client.mock"

describe("Create client route tests", () => {
  let conn: DataSource
  const baseUrl: string = "/clients/profile"

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (conn = res))
      .catch((err) => console.log(err))

    await request(app).post("/clients").send(client)
  })

  afterAll(async () => {
    await conn.destroy()
  })

  test("GET /clients/profile - should be list client profile", async () => {
    const resLogin = await request(app).post("/auth").send(clientLogin)

    const res = await request(app)
      .get(baseUrl)
      .set("Authorization", `Bearer ${resLogin.body.token}`)
      .send()

    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty("id")
    expect(res.body).toHaveProperty("fullName")
    expect(res.body).toHaveProperty("email")
    expect(res.body).toHaveProperty("phoneNumber")
    expect(res.body).toHaveProperty("createdAt")
    expect(res.body).not.toHaveProperty("password")
  })

  test("GET /clients/profile - should not be list client profile without token", async () => {
    const res = await request(app).get(baseUrl).send()

    expect(res.statusCode).toEqual(401)
    expect(res.body).toHaveProperty("message")
  })
})
