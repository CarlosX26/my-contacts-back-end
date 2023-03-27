import request from "supertest"
import AppDataSource from "../../../data-source"
import app from "../../../app"
import { DataSource } from "typeorm"
import {
  client,
  clientLogin,
  clientUpdate,
} from "../../mocks/clients/client.mock"

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

  test("PATCH /clients/profile - should be update client profile", async () => {
    const resLogin = await request(app).post("/auth").send(clientLogin)

    const res = await request(app)
      .patch(baseUrl)
      .set("Authorization", `Bearer ${resLogin.body.token}`)
      .send(clientUpdate)

    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty("id")
    expect(res.body).toHaveProperty("fullName")
    expect(res.body).toHaveProperty("email")
    expect(res.body).toHaveProperty("phoneNumber")
    expect(res.body).toHaveProperty("createdAt")
    expect(res.body).not.toHaveProperty("password")
  })

  test("PATCH /clients/profile - should not be update client profile without token", async () => {
    const res = await request(app).patch(baseUrl).send(clientUpdate)

    expect(res.statusCode).toEqual(401)
    expect(res.body).toHaveProperty("message")
  })

  test("PATCH /clients/profile - should not be update client profile email already exists", async () => {
    const resLogin = await request(app).post("/auth").send(clientLogin)

    const res = await request(app)
      .patch(baseUrl)
      .set("Authorization", `Bearer ${resLogin.body.token}`)
      .send(client)

    expect(res.statusCode).toEqual(409)
    expect(res.body).toHaveProperty("message")
  })
})
