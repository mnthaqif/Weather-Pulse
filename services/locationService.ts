
// Simulated database of major world cities
const CITIES = [
  // --- MALAYSIA (Expanded) ---
  "Kuala Lumpur, MY", "George Town, MY", "Ipoh, MY", "Shah Alam, MY", "Petaling Jaya, MY",
  "Johor Bahru, MY", "Melaka City, MY", "Kota Kinabalu, MY", "Kuching, MY", "Alor Setar, MY",
  "Kuala Terengganu, MY", "Kota Bharu, MY", "Miri, MY", "Seremban, MY", "Kuantan, MY",
  "Putrajaya, MY", "Cyberjaya, MY", "Subang Jaya, MY", "Klang, MY", "Kajang, MY",
  "Selayang, MY", "Ampang Jaya, MY", "Iskandar Puteri, MY", "Seberang Perai, MY",
  "Pasir Gudang, MY", "Taiping, MY", "Sandakan, MY", "Tawau, MY", "Kulim, MY",
  "Sungai Petani, MY", "Batu Pahat, MY", "Kluang, MY", "Muar, MY", "Sibu, MY",
  "Bintulu, MY", "Teluk Intan, MY", "Rawang, MY", "Sepang, MY", "Port Dickson, MY",
  "Langkawi, MY", "Cameron Highlands, MY", "Genting Highlands, MY", "Labuan, MY",

  // --- USA ---
  "New York, NY", "Los Angeles, CA", "Chicago, IL", "Houston, TX", "Phoenix, AZ",
  "Philadelphia, PA", "San Antonio, TX", "San Diego, CA", "Dallas, TX", "San Jose, CA",
  "Austin, TX", "Jacksonville, FL", "Fort Worth, TX", "Columbus, OH", "San Francisco, CA",
  "Charlotte, NC", "Indianapolis, IN", "Seattle, WA", "Denver, CO", "Washington, DC",
  "Boston, MA", "Nashville, TN", "Detroit, MI", "Portland, OR", "Las Vegas, NV",
  "Miami, FL", "Atlanta, GA", "New Orleans, LA", "Orlando, FL", "Honolulu, HI",

  // --- UK & Europe ---
  "London, UK", "Manchester, UK", "Birmingham, UK", "Leeds, UK", "Glasgow, UK",
  "Edinburgh, UK", "Liverpool, UK", "Bristol, UK", "Cardiff, UK", "Belfast, UK",
  "Paris, France", "Marseille, France", "Lyon, France", "Toulouse, France", "Nice, France",
  "Berlin, DE", "Hamburg, DE", "Munich, DE", "Cologne, DE", "Frankfurt, DE",
  "Madrid, ES", "Barcelona, ES", "Valencia, ES", "Seville, ES", "Malaga, ES",
  "Rome, IT", "Milan, IT", "Naples, IT", "Turin, IT", "Florence, IT", "Venice, IT",
  "Amsterdam, NL", "Rotterdam, NL", "The Hague, NL", "Brussels, BE", "Antwerp, BE",
  "Vienna, AT", "Zurich, CH", "Geneva, CH", "Bern, CH",
  "Stockholm, SE", "Gothenburg, SE", "Oslo, NO", "Bergen, NO", 
  "Copenhagen, DK", "Aarhus, DK", "Helsinki, FI", "Espoo, FI",
  "Warsaw, PL", "Krakow, PL", "Prague, CZ", "Budapest, HU", "Athens, GR", "Thessaloniki, GR",
  "Lisbon, PT", "Porto, PT", "Dublin, IE", "Cork, IE", "Reykjavik, IS",

  // --- Asia Pacific ---
  "Tokyo, JP", "Osaka, JP", "Yokohama, JP", "Nagoya, JP", "Sapporo, JP", "Kyoto, JP", "Fukuoka, JP",
  "Seoul, KR", "Busan, KR", "Incheon, KR", "Daegu, KR",
  "Beijing, CN", "Shanghai, CN", "Guangzhou, CN", "Shenzhen, CN", "Chengdu, CN", "Hong Kong, HK", "Macau, MO", "Taipei, TW",
  "Singapore, SG", 
  "Bangkok, TH", "Phuket, TH", "Chiang Mai, TH", 
  "Jakarta, ID", "Surabaya, ID", "Bandung, ID", "Medan, ID", "Bali, ID",
  "Hanoi, VN", "Ho Chi Minh City, VN", "Da Nang, VN",
  "Manila, PH", "Quezon City, PH", "Cebu City, PH", "Davao City, PH",
  "Sydney, AU", "Melbourne, AU", "Brisbane, AU", "Perth, AU", "Adelaide, AU", "Gold Coast, AU",
  "Auckland, NZ", "Wellington, NZ", "Christchurch, NZ",
  "Mumbai, IN", "Delhi, IN", "Bangalore, IN", "Hyderabad, IN", "Chennai, IN", "Kolkata, IN",

  // --- Middle East & Africa ---
  "Dubai, AE", "Abu Dhabi, AE", "Sharjah, AE",
  "Riyadh, SA", "Jeddah, SA", "Mecca, SA",
  "Doha, QA", "Kuwait City, KW", "Manama, BH", "Muscat, OM",
  "Istanbul, TR", "Ankara, TR", "Izmir, TR", "Antalya, TR",
  "Tel Aviv, IL", "Jerusalem, IL", "Haifa, IL",
  "Cairo, EG", "Alexandria, EG", "Giza, EG",
  "Lagos, NG", "Abuja, NG", 
  "Johannesburg, ZA", "Cape Town, ZA", "Durban, ZA", "Pretoria, ZA",
  "Nairobi, KE", "Casablanca, MA", "Marrakesh, MA",

  // --- Americas (Non-USA) ---
  "Toronto, CA", "Montreal, CA", "Vancouver, CA", "Calgary, CA", "Ottawa, CA", "Edmonton, CA",
  "Mexico City, MX", "Guadalajara, MX", "Monterrey, MX", "Cancun, MX",
  "São Paulo, BR", "Rio de Janeiro, BR", "Brasília, BR", "Salvador, BR", "Fortaleza, BR",
  "Buenos Aires, AR", "Cordoba, AR", "Rosario, AR",
  "Santiago, CL", "Valparaiso, CL",
  "Bogota, CO", "Medellin, CO", "Cartagena, CO",
  "Lima, PE", "Cusco, PE"
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
    .slice(0, 10); // Increased limit to top 10 results
};
