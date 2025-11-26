import { getTaxRate } from '../services/taxData';
import { TaxType } from '../types';

export const calculateNetto = (brutto: number, country: string, taxType: TaxType): number => {
  const rate = getTaxRate(country, taxType);
  return brutto * (1 - rate);
};

export const calculateBrutto = (netto: number, country: string, taxType: TaxType): number => {
  const rate = getTaxRate(country, taxType);
  return netto / (1 - rate);
};

