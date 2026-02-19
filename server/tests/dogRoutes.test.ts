import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import request from "supertest";
import express, { Express, Request, Response } from "express";

//mockataan controller moduulin tasolla
vi.mock("../controllers/dogController", () => ({
  getDogImage: vi.fn(async (_req: Request, res: Response) => {
    res.json({
      success: true,
      data: {
        imageUrl: "https://images.dog.ceo/breeds/stbernard/n02109525_15579.jpg",
        status: "success",
      },
    });
  }),
}));

//tuodaan route vasta mockauksen jälkeen
import dogRoutes from "../routes/dogRoutes";

describe("dogRoutes positive test", () => {
  let app: Express;

  beforeEach(() => {
    //uusi Express-app joka testiä varten
    app = express();
    app.use("/api/dogs", dogRoutes);
  });
  
  afterEach(() => {
    //tyhjennetään ja resetataan kaikki mockit
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  it("GET /api/dogs/random returns 200 and success true", async () => {
    const response = await request(app).get("/api/dogs/random");
    //statuskoodin tarkistus
    expect(response.status).toBe(200);
    //JSON succes arvon tarkistus
    expect(response.body.success).toBe(true);
    //tarkistetaan että imageUrl sisältää mockatun URL
    expect(response.body.data.imageUrl).toContain(
      "https://images.dog.ceo/breeds/stbernard/n02109525_15579.jpg"
    );
  });
});