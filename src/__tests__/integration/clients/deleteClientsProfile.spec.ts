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

  test("DELETE /clients/profile - should be delelte client profile", async () => {
    const resLogin = await request(app).post("/auth").send(clientLogin)

    const res = await request(app)
      .delete(baseUrl)
      .set("Authorization", `Bearer ${resLogin.body.token}`)
      .send()

    expect(res.statusCode).toEqual(204)
    expect(res.body).toEqual({})
  })

  test("DELETE /clients/profile - should not be delelte client profile without token", async () => {
    const res = await request(app).delete(baseUrl).send()

    expect(res.statusCode).toEqual(401)
    expect(res.body).toHaveProperty("message")
  })
})
