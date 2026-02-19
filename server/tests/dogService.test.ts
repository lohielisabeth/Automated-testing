import { getRandomDogImage } from "../services/dogService";
import { describe, it, expect, vi, beforeEach } from "vitest";

describe("dogService positive test", () => {
    //mockattu api-vastaus(fetch funktio palauttaa)
    const mockedApiResponse = {
        message: "https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg",
        status: "success",
    }

    beforeEach(() => {
        //tyhjennetään mockit
        vi.clearAllMocks();

        global.fetch = vi.fn().mockResolvedValue({
        ok: true, //pitää olla true kun tarkistetaan response.ok
        json: vi.fn().mockResolvedValue(mockedApiResponse), //palautetaan mockattu JSON-data
        } as any)
    });
    //yksittäinen testi
    it("should return imageUrl and success status and call fetch once", async () => {
        const result = await getRandomDogImage();
        expect(result.imageUrl).toBe(mockedApiResponse.message); //odotettu tulos on että kuvan URL täsmää mockattuun messageen
        expect(result.status).toBe("success");

        expect(global.fetch).toHaveBeenCalledOnce(); //fetchiä on kutsuttu vain kerran
    })
    })

describe("dogService negative test", () => {
  it("should throw an error when fetch returns ok: false", async () => {
    //fetch mockataan palauttamaan virheellinen vastaus
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
    } as any);
    //tarkistetaan että heittää virheen
    await expect(getRandomDogImage()).rejects.toThrow(
      "Dog API returned status 500" 
    )
    expect(global.fetch).toHaveBeenCalledOnce() //fetchiä kutsutaan vain kerran
  })
})

