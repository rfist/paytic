import { SalaryInput, TargetConfig, Currency, Period, TaxType } from '../types';

export const encodeParams = (input: SalaryInput, target: TargetConfig): string => {
  const params = new URLSearchParams();
  params.set('country', input.country);
  params.set('currency', input.currency);
  params.set('amount', input.amount.toString());
  params.set('period', input.period);
  params.set('taxType', input.taxType);
  params.set('targetCountry', target.country);
  params.set('targetCurrency', target.currency);
  params.set('targetPeriod', target.period);
  params.set('targetTaxType', target.taxType);
  params.set('includePPP', target.includePPP.toString());
  return params.toString();
};

export const decodeParams = (searchParams: URLSearchParams): {
  input: Partial<SalaryInput>;
  target: Partial<TargetConfig>;
} | null => {
  try {
    const input: Partial<SalaryInput> = {};
    const target: Partial<TargetConfig> = {};

    if (searchParams.get('country')) input.country = searchParams.get('country')!;
    if (searchParams.get('currency')) input.currency = searchParams.get('currency') as Currency;
    if (searchParams.get('amount')) input.amount = parseFloat(searchParams.get('amount')!);
    if (searchParams.get('period')) input.period = searchParams.get('period') as Period;
    if (searchParams.get('taxType')) input.taxType = searchParams.get('taxType') as TaxType;

    if (searchParams.get('targetCountry')) target.country = searchParams.get('targetCountry')!;
    if (searchParams.get('targetCurrency')) target.currency = searchParams.get('targetCurrency') as Currency;
    if (searchParams.get('targetPeriod')) target.period = searchParams.get('targetPeriod') as Period;
    if (searchParams.get('targetTaxType')) target.taxType = searchParams.get('targetTaxType') as TaxType;
    if (searchParams.get('includePPP')) target.includePPP = searchParams.get('includePPP') === 'true';

    return { input, target };
  } catch {
    return null;
  }
};

