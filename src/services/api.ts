// Mock API - will be replaced with real API calls later
export const getExchangeRate = async (base: string, target: string): Promise<number> => {
  // Mock exchange rates (as of 2025)
  const rates: Record<string, Record<string, number>> = {
    PLN: { USD: 0.25, EUR: 0.23, GBP: 0.20, UAH: 10.0 },
    USD: { PLN: 4.0, EUR: 0.92, GBP: 0.79, UAH: 40.0 },
    EUR: { PLN: 4.35, USD: 1.09, GBP: 0.86, UAH: 43.5 },
    GBP: { PLN: 5.05, USD: 1.27, EUR: 1.16, UAH: 50.5 },
    UAH: { PLN: 0.1, USD: 0.025, EUR: 0.023, GBP: 0.02 },
  };
  return rates[base]?.[target] || 1;
};

export const getPPPIndex = async (country: string): Promise<number> => {
  // Mock PPP indices (relative to USA = 1.0)
  const pppIndices: Record<string, number> = {
    Poland: 0.6,
    'United States': 1.0,
    Ukraine: 0.3,
    Germany: 0.85,
    'United Kingdom': 0.9,
    France: 0.8,
    Spain: 0.7,
    Italy: 0.75,
    Netherlands: 0.88,
    Sweden: 0.92,
    Switzerland: 1.15,
    Canada: 0.95,
    Australia: 0.95,
    Japan: 0.9,
    'South Korea': 0.75,
    China: 0.4,
    India: 0.25,
    Brazil: 0.45,
    Mexico: 0.5,
    'Czech Republic': 0.55,
    Hungary: 0.5,
    Romania: 0.4,
  };
  return pppIndices[country] || 1.0;
};

export const getTaxRate = async (_country: string, _year: number): Promise<number> => {
  // Mock - will use taxData.ts for now
  return 0.2;
};

