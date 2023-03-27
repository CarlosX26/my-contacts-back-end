import request from "supertest"
import AppDataSource from "../../../data-source"
import app from "../../../app"
import { DataSource } from "typeorm"
import { client, clientInvalid } from "../../mocks/clients/client.mock"

describe("Create client route tests", () => {
  let conn: DataSource
  const baseUrl: string = "/clients"

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (conn = res))
      .catch((err) => console.log(err))
  })

  afterAll(async () => {
    await conn.destroy()
  })

  test("POST /clients - should be create client", async () => {
    const res = await request(app).post(baseUrl).send(client)

    expect(res.statusCode).toEqual(201)
    expect(res.body).toHaveProperty("id")
    expect(res.body).toHaveProperty("fullName")
    expect(res.body).toHaveProperty("email")
    expect(res.body).toHaveProperty("phoneNumber")
    expect(res.body).toHaveProperty("createdAt")
    expect(res.body).not.toHaveProperty("password")
  })
  test("POST /clients - must not create client with invalid body", async () => {
    const res = await request(app).post(baseUrl).send(clientInvalid)

    expect(res.statusCode).toEqual(400)
  })

  test("POST /clients - should not be create client with email already exists", async () => {
    const res = await request(app).post(baseUrl).send(client)

    expect(res.statusCode).toEqual(409)
    expect(res.body).toHaveProperty("message")
  })
})
