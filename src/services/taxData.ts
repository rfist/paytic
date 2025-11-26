// Mock tax data - will be replaced with real API later
// Effective tax rates (2025 estimates)
export const TAX_RATES: Record<string, { brutto: number; netto: number }> = {
  Poland: { brutto: 0.32, netto: 0.23 },
  'United States': { brutto: 0.24, netto: 0.18 },
  Ukraine: { brutto: 0.195, netto: 0.18 },
  Germany: { brutto: 0.42, netto: 0.35 },
  'United Kingdom': { brutto: 0.32, netto: 0.25 },
  France: { brutto: 0.45, netto: 0.38 },
  Spain: { brutto: 0.35, netto: 0.28 },
  Italy: { brutto: 0.43, netto: 0.35 },
  Netherlands: { brutto: 0.37, netto: 0.30 },
  Sweden: { brutto: 0.42, netto: 0.35 },
  Switzerland: { brutto: 0.22, netto: 0.18 },
  Canada: { brutto: 0.30, netto: 0.24 },
  Australia: { brutto: 0.32, netto: 0.26 },
  Japan: { brutto: 0.30, netto: 0.24 },
  'South Korea': { brutto: 0.24, netto: 0.20 },
  China: { brutto: 0.25, netto: 0.20 },
  India: { brutto: 0.30, netto: 0.25 },
  Brazil: { brutto: 0.275, netto: 0.22 },
  Mexico: { brutto: 0.30, netto: 0.25 },
  'Czech Republic': { brutto: 0.31, netto: 0.24 },
  Hungary: { brutto: 0.33, netto: 0.26 },
  Romania: { brutto: 0.35, netto: 0.28 },
};

export const getTaxRate = (country: string, taxType: 'brutto' | 'netto'): number => {
  return TAX_RATES[country]?.[taxType] || 0.2;
};

