import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import express from "express";
import scoresRouter from "../src/api/scores";
import prisma from "../src/lib/db";

const app = express();
app.use(express.json());
app.use("/api/scores", scoresRouter);

describe("Scores API", () => {
  beforeAll(async () => {
    // optioneel: database reset
    await prisma.score.deleteMany();
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("GET /api/scores returns empty array on empty DB", async () => {
    const res = await request(app).get("/api/scores?game=space-invaders");
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it("POST /api/scores creates a new score", async () => {
    const res = await request(app)
      .post("/api/scores")
      .send({ username: "testuser", game: "space-invaders", score: 5000 });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("id");
    expect(res.body.score).toBe(5000);
  });

  it("GET /api/scores returns the new score", async () => {
    const res = await request(app).get("/api/scores?game=space-invaders");
    expect(res.body.length).toBe(1);
    expect(res.body[0].user.username).toBe("testuser");
  });

  it("POST /api/scores rejects too high score", async () => {
    const res = await request(app)
      .post("/api/scores")
      .send({ username: "testuser2", game: "space-invaders", score: 100001 });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("score must be between 0 and 100000");
  });

  it("POST /api/scores rejects negative score", async () => {
    const res = await request(app)
      .post("/api/scores")
      .send({ username: "testuser2", game: "space-invaders", score: -1 });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("score must be between 0 and 100000");
  });

  it("POST /api/scores rejects duplicate submission within 1 minute", async () => {
    // Eerste score is geldig
    await request(app)
      .post("/api/scores")
      .send({ username: "spamuser", game: "space-invaders", score: 1000 });

    // Tweede poging direct erna moet falen
    const res = await request(app)
      .post("/api/scores")
      .send({ username: "spamuser", game: "space-invaders", score: 2000 });

    expect(res.status).toBe(429);
    expect(res.body.error).toBe("Too many submissions, wait before posting again");
  });

  it("GET /api/scores respects max limit", async () => {
    const res = await request(app).get("/api/scores?game=space-invaders&limit=50");
    expect(res.status).toBe(200);
    expect(res.body.length).toBeLessThanOrEqual(50);
  });

  it("GET /api/scores returns 404 for invalid game slug", async () => {
    const res = await request(app).get("/api/scores?game=nonexistent-game");
    expect(res.status).toBe(404);
    expect(res.body.error).toBe("game not found");
  });

  it("POST /api/scores returns 404 for invalid game slug", async () => {
    const res = await request(app)
      .post("/api/scores")
      .send({ username: "userX", game: "nonexistent-game", score: 100 });
    expect(res.status).toBe(404);
    expect(res.body.error).toBe("game not found");
  });
});