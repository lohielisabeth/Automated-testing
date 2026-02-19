import { describe, it, expect, vi, beforeEach } from "vitest";
import { getDogImage } from "../controllers/dogController";
import * as dogService from "../services/dogService";
import { Request } from "express";

describe("dogController positive test", () => {
  const mockedServiceResponse = {
    imageUrl: "https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg",
    status: "success",
  }

  const req = {} as Request;
  const res: any = {
    json: vi.fn(),
    status: vi.fn().mockReturnThis(),
  }

  beforeEach(() => {
    vi.clearAllMocks(); 
  })

  it("should return success true and mocked JSON from service", async () => {
    vi.spyOn(dogService, "getRandomDogImage").mockResolvedValue(mockedServiceResponse);
    await getDogImage(req, res);
    expect(res.json).toHaveBeenCalledOnce();
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: mockedServiceResponse,
    })
  })
})