import request from "supertest"
import AppDataSource from "../../../data-source"
import app from "../../../app"
import { DataSource } from "typeorm"
import { client, clientLogin } from "../../mocks/clients/client.mock"
import {
  contactInvalidMock,
  contactMock,
} from "../../mocks/contacts/contact.mock"

describe("Create client route tests", () => {
  let conn: DataSource
  const baseUrl: string = "/contacts"

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (conn = res))
      .catch((err) => console.log(err))

    await request(app).post("/clients").send(client)
  })

  afterAll(async () => {
    await conn.destroy()
  })

  test("POST /contacts - should be create contact", async () => {
    const resLogin = await request(app).post("/auth").send(clientLogin)

    const res = await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${resLogin.body.token}`)
      .send(contactMock)

    expect(res.statusCode).toEqual(201)
    expect(res.body).toHaveProperty("id")
    expect(res.body).toHaveProperty("fullName")
    expect(res.body).toHaveProperty("email")
    expect(res.body).toHaveProperty("phoneNumber")
    expect(res.body).toHaveProperty("createdAt")
  })
  test("POST /clients - must not create client with invalid body", async () => {
    const resLogin = await request(app).post("/auth").send(clientLogin)

    const res = await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${resLogin.body.token}`)
      .send(contactInvalidMock)

    expect(res.statusCode).toEqual(400)
  })
})
