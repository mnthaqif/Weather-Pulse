
// Simulated database of major world cities
const CITIES = [
  "New York, NY", "Los Angeles, CA", "Chicago, IL", "Houston, TX", "Phoenix, AZ",
  "Philadelphia, PA", "San Antonio, TX", "San Diego, CA", "Dallas, TX", "San Jose, CA",
  "Austin, TX", "Jacksonville, FL", "Fort Worth, TX", "Columbus, OH", "San Francisco, CA",
  "Charlotte, NC", "Indianapolis, IN", "Seattle, WA", "Denver, CO", "Washington, DC",
  "Boston, MA", "Nashville, TN", "Detroit, MI", "Portland, OR", "Las Vegas, NV",
  "London, UK", "Manchester, UK", "Birmingham, UK", "Leeds, UK", "Glasgow, UK",
  "Paris, France", "Marseille, France", "Lyon, France", "Toulouse, France", "Nice, France",
  "Tokyo, JP", "Osaka, JP", "Yokohama, JP", "Nagoya, JP", "Sapporo, JP",
  "Berlin, DE", "Hamburg, DE", "Munich, DE", "Cologne, DE", "Frankfurt, DE",
  "Sydney, AU", "Melbourne, AU", "Brisbane, AU", "Perth, AU", "Adelaide, AU",
  "Toronto, CA", "Montreal, CA", "Vancouver, CA", "Calgary, CA", "Ottawa, CA",
  "Beijing, CN", "Shanghai, CN", "Guangzhou, CN", "Shenzhen, CN", "Chengdu, CN",
  "Mumbai, IN", "Delhi, IN", "Bangalore, IN", "Hyderabad, IN", "Chennai, IN",
  "Moscow, RU", "Saint Petersburg, RU", "Novosibirsk, RU", "Yekaterinburg, RU",
  "São Paulo, BR", "Rio de Janeiro, BR", "Brasília, BR", "Salvador, BR",
  "Mexico City, MX", "Guadalajara, MX", "Monterrey, MX",
  "Cairo, EG", "Lagos, NG", "Johannesburg, ZA", "Cape Town, ZA",
  "Dubai, AE", "Abu Dhabi, AE", "Singapore, SG", "Seoul, KR", "Bangkok, TH", 
  "Istanbul, TR", "Jakarta, ID", "Kuala Lumpur, MY", "Hanoi, VN",
  "Madrid, ES", "Barcelona, ES", "Valencia, ES", "Seville, ES",
  "Rome, IT", "Milan, IT", "Naples, IT", "Turin, IT",
  "Amsterdam, NL", "Rotterdam, NL", "Brussels, BE", "Vienna, AT",
  "Zurich, CH", "Geneva, CH", "Stockholm, SE", "Oslo, NO", "Copenhagen, DK",
  "Helsinki, FI", "Warsaw, PL", "Prague, CZ", "Budapest, HU", "Athens, GR",
  "Lisbon, PT", "Dublin, IE", "Edinburgh, UK", "Auckland, NZ", "Wellington, NZ"
];

/**
 * Simulates an API call to search for locations.
 * Returns a promise that resolves to a list of matching cities.
 */
export const searchLocations = async (query: string): Promise<string[]> => {
  // Simulate network latency (200-500ms)
  const delay = 200 + Math.random() * 300;
  await new Promise(resolve => setTimeout(resolve, delay));
  
  if (!query || query.trim().length < 2) return [];
  
  const lowerQuery = query.toLowerCase().trim();
  
  // Filter cities that contain the query string
  // Sort by starting with the query first, then containing it
  return CITIES.filter(city => city.toLowerCase().includes(lowerQuery))
    .sort((a, b) => {
      const aStarts = a.toLowerCase().startsWith(lowerQuery);
      const bStarts = b.toLowerCase().startsWith(lowerQuery);
      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;
      return 0;
    })
    .slice(0, 8); // Limit to top 8 results
};
