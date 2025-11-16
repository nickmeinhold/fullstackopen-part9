import request from "supertest";
import app from "./index";

describe("GET /bmi", () => {
  test("returns bmi for valid params", async () => {
    const res = await request(app).get("/bmi?height=180&weight=72");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("bmi");
    expect(res.body.height).toBe(180);
    expect(res.body.weight).toBe(72);
  });

  test("returns 400 for missing params", async () => {
    const res = await request(app).get("/bmi");
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: "malformatted parameters" });
  });

  test("returns 400 for non-numeric params", async () => {
    const res = await request(app).get("/bmi?height=foo&weight=72");
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: "malformatted parameters" });
  });
});

describe("POST /exercises", () => {
  const payload = { daily_exercises: [1, 0, 2, 0, 3, 0, 2.5], target: 2.5 };

  test("returns exercise summary for valid input", async () => {
    const res = await request(app).post("/exercises").send(payload);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("periodLength", 7);
    expect(res.body).toHaveProperty("trainingDays", 4);
    expect(res.body).toHaveProperty("success", false);
    expect(res.body).toHaveProperty("rating");
    expect(res.body).toHaveProperty("ratingDescription");
    expect(res.body.target).toBeCloseTo(2.5);
    expect(res.body.average).toBeCloseTo(1.2142857142857142);
  });

  test("returns 400 when parameters missing", async () => {
    const res = await request(app).post("/exercises").send({});
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: "parameters missing" });
  });

  test("returns 400 when malformatted", async () => {
    const res = await request(app)
      .post("/exercises")
      .send({ daily_exercises: ["a", "b"], target: "x" });
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: "malformatted parameters" });
  });
});
