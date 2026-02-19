import { describe, it, expect, vi, beforeEach } from "vitest";
import { getDogImage } from "../controllers/dogController";
import * as dogService from "../services/dogService";
import { Request } from "express";

describe("dogController positive test", () => {
    //mockattu data jonka dogservice palauttaa
    const mockedServiceResponse = {
        imageUrl: "https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg",
        status: "success",
    }
    const req = {} as Request;
    //mockattu response objekti
    const res: any = {
        json: vi.fn(),
        status: vi.fn().mockReturnThis(),
    }
    //tyhjennetään mockit ennen jokaista testiä
    beforeEach(() => {
        vi.clearAllMocks(); 
    })
    it("should return success true and mocked JSON from service", async () => {
        //service funktio mockataan palauttamaan valmiin datan
        vi.spyOn(dogService, "getRandomDogImage").mockResolvedValue(mockedServiceResponse);
        await getDogImage(req, res); // Kutsutaan mock requestilla controlleria
        expect(res.json).toHaveBeenCalledOnce(); //tarkistetaan että res json kutsuttiin vain kerran
        expect(res.json).toHaveBeenCalledWith({
        //varmistus että controller palautti oikean JSONin
        success: true,
        data: mockedServiceResponse,
        })
    })
})