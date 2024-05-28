import axios from "axios";
import { AirportDef } from "../types";

const API_URL = "https://api.api-ninjas.com/v1/airports";
const API_KEY = "tOK4dDb0/maoKPjdBBOZeA==9Un1kJzyclB50MdY"; // Replace with your actual API key

export async function fetchAirports(
  nameQuery: string,
  country: string,
  timezone: string,
  offset = 0
): Promise<AirportDef[]> {
  try {
    const response = await axios.get(API_URL, {
      headers: { "X-Api-Key": API_KEY },
      params: {
        name: nameQuery,
        country: country,
        timezone: timezone,
        offset,
      },
    });
    return response.data as AirportDef[];
  } catch (error) {
    throw new Error("Failed to fetch airports");
  }
}
