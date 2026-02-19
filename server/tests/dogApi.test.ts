import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import request from "supertest";
import express, { Express, Request, Response } from "express";

//negatiivinen mock controller, joka palauttaa virhe-JSON
vi.mock("../controllers/dogController", () => ({
  getDogImage: vi.fn(async (_req: Request, res: Response) => {
    res.status(500).json({
      success: false,
      error: "Failed to fetch dog image: Network error",
    });
  }),
}));

//tuodaan route vasta mockauksen jälkeen
import dogRoutes from "../routes/dogRoutes";

describe("dogRoutes negative test", () => {
  let app: Express;

  beforeEach(() => {
    app = express();
    app.use("/api/dogs", dogRoutes);
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  //controller palauttaa virheen
  it("GET /api/dogs/random returns 500 and error JSON", async () => {
    const response = await request(app).get("/api/dogs/random");
    // tarkistetaan että status on 500
    expect(response.status).toBe(500);
    // tarksitetaan että JSON sisältää error-kentän
    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe(
      "Failed to fetch dog image: Network error"
    );
  });
});