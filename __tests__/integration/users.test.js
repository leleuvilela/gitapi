const request = require("supertest");
const nodemailer = require("nodemailer");

const app = require("../../src/app");
const truncate = require("../utils/truncate");

jest.mock("nodemailer");

const transport = {
  sendMail: jest.fn()
};

describe("Authentication", () => {
  beforeEach(async () => {
    await truncate();
  });

  beforeAll(() => {});

  it("should be able to get users of github", async () => {
    const response = await request(app).get("/api/users");

    expect(response.body[0]).toHaveProperty("login");
    expect(response.status).toBe(200);
  });

  it("should be able to get users of github with valid synce", async () => {
    const response = await request(app).get("/api/users?since=123");

    expect(response.body[0]).toHaveProperty("login");
    expect(response.status).toBe(200);
  });

  it("should not be able to get users of github with invalid synce", async () => {
    const response = await request(app).get("/api/users?since=abc");

    expect(response.status).toBe(400);
  });

  it("should be able to get details of a valid user", async () => {
    const response = await request(app).get("/api/users/leleuvilela/details");

    expect(response.body).toHaveProperty("login");
    expect(response.status).toBe(200);
  });

  it("should not be able to get details of a invalid user", async () => {
    const response = await request(app).get(
      "/api/users/afsfsdfasdfasdfasdf/details"
    );

    expect(response.status).toBe(404);
  });

  it("should be able to get repositories of a valid user", async () => {
    const response = await request(app).get("/api/users/leleuvilela/repos");

    expect(response.body[0]).toHaveProperty("name");
    expect(response.status).toBe(200);
  });

  it("should not be able to get repositories of a invalid user", async () => {
    const response = await request(app).get(
      "/api/users/afsfsdfasdfasdfasdf/repos"
    );

    expect(response.status).toBe(404);
  });
});
