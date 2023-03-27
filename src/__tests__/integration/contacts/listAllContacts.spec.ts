import request from "supertest"
import AppDataSource from "../../../data-source"
import app from "../../../app"
import { DataSource } from "typeorm"
import { client, clientLogin } from "../../mocks/clients/client.mock"
import { contactMock } from "../../mocks/contacts/contact.mock"

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

  test("GET /contacts - should be list contacts", async () => {
    const resLogin = await request(app).post("/auth").send(clientLogin)

    await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${resLogin.body.token}`)
      .send(contactMock)
    await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${resLogin.body.token}`)
      .send(contactMock)

    const res = await request(app)
      .get(baseUrl)
      .set("Authorization", `Bearer ${resLogin.body.token}`)
      .send()

    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveLength(2)
  })

  test("GET /contacts - should not be list contacts without token", async () => {
    const res = await request(app).get(baseUrl).send()

    expect(res.statusCode).toEqual(401)
    expect(res.body).toHaveProperty("message")
  })
})
