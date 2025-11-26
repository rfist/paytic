export type Period = 'hour' | 'month' | 'year';
export type TaxType = 'brutto' | 'netto';
export type Currency = 'PLN' | 'USD' | 'UAH' | 'EUR' | 'GBP';

export interface SalaryInput {
  country: string;
  currency: Currency;
  amount: number;
  period: Period;
  taxType: TaxType;
}

export interface TargetConfig {
  country: string;
  currency: Currency;
  period: Period;
  taxType: TaxType;
  includePPP: boolean;
}

export interface CalculationResult {
  format: string;
  brutto: string;
  netto: string;
  notes?: string;
}

