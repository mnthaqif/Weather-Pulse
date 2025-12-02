import { GoogleGenAI } from "@google/genai";
import { WeatherData } from "../types";

const apiKey = process.env.API_KEY || '';

// Initialize carefully to avoid crashes if env is missing (though prompt guarantees it)
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const getAIWeatherInsight = async (weather: WeatherData): Promise<string> => {
  if (!ai) return "AI services unavailable. Please check API Key.";

  try {
    const prompt = `
      You are a witty and helpful weather assistant.
      The current weather in ${weather.location} is ${weather.condition}.
      Temperature: ${weather.currentTemp}°C.
      Humidity: ${weather.humidity}%.
      Wind: ${weather.windSpeed} km/h.
      
      Give a short, fun, 2-sentence advice on what to wear and whether to go outside.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Stay cool and enjoy the weather!";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Could not fetch AI insight at the moment.";
  }
};
