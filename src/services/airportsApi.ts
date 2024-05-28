import axios from "axios";
import { AirportDef } from "../types";

const API_URL = "https://api.api-ninjas.com/v1/airports";
// It's generally not recommended to include sensitive values, such as API keys, directly in the code.
// Instead, these values should be stored in environment variables and accessed using the process.env object.
// This helps to keep sensitive information secure and separate from the application code.
// In this case, the REACT_APP_API_NINJA_KEY environment variable should be defined in the .env file or in the hosting platform's environment configuration.
const API_KEY = process.env.VITE_API_NINJA_KEY;

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
