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

  test("DELETE /contacts/:id - should be delete contacts", async () => {
    const resLogin = await request(app).post("/auth").send(clientLogin)

    const contact = await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${resLogin.body.token}`)
      .send(contactMock)

    const res = await request(app)
      .delete(`${baseUrl}/${contact.body.id}`)
      .set("Authorization", `Bearer ${resLogin.body.token}`)
      .send()

    expect(res.statusCode).toEqual(204)
    expect(res.body).toEqual({})
  })

  test("DELETE /contacts/:id - should not be delete contacts without token", async () => {
    const resLogin = await request(app).post("/auth").send(clientLogin)

    const contact = await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${resLogin.body.token}`)
      .send(contactMock)

    const res = await request(app)
      .delete(`${baseUrl}/${contact.body.id}`)
      .send()

    expect(res.statusCode).toEqual(401)
    expect(res.body).toHaveProperty("message")
  })
})
