import { SalaryInput, TargetConfig, CalculationResult } from '../types';
import { getExchangeRate, getPPPIndex } from '../services/api';
import { getTaxRate } from '../services/taxData';
import { calculateBrutto } from './tax';
import { formatCurrency } from './currency';
import { WORKING_HOURS_PER_MONTH } from '../constants';

export const calculateSalary = async (
  input: SalaryInput,
  target: TargetConfig
): Promise<CalculationResult[]> => {
  // Step 1: Normalize input to monthly brutto
  let monthlyBrutto: number;

  if (input.period === 'hour') {
    monthlyBrutto = input.amount * WORKING_HOURS_PER_MONTH;
  } else if (input.period === 'month') {
    monthlyBrutto = input.amount;
  } else {
    // year
    monthlyBrutto = input.amount / 12;
  }

  // Convert to brutto if input is netto
  if (input.taxType === 'netto') {
    monthlyBrutto = calculateBrutto(monthlyBrutto, input.country, 'netto');
  }

  // Step 2: Convert currency
  const exchangeRate = await getExchangeRate(input.currency, target.currency);
  let monthlyBruttoTarget = monthlyBrutto * exchangeRate;

  // Step 3: Apply PPP adjustment if enabled
  if (target.includePPP) {
    const sourcePPP = await getPPPIndex(input.country);
    const targetPPP = await getPPPIndex(target.country);
    if (targetPPP > 0) {
      monthlyBruttoTarget = monthlyBruttoTarget * (sourcePPP / targetPPP);
    }
  }

  // Step 4: Calculate netto in target currency
  const targetTaxRate = getTaxRate(target.country, target.taxType);
  const monthlyNettoTarget = monthlyBruttoTarget * (1 - targetTaxRate);

  // Step 5: Generate all output formats
  const results: CalculationResult[] = [];

  // Monthly format
  const monthlyBruttoFormatted = formatCurrency(monthlyBruttoTarget, target.currency);
  const monthlyNettoFormatted = formatCurrency(monthlyNettoTarget, target.currency);
  const taxPercent = Math.round(targetTaxRate * 100);
  results.push({
    format: `${target.currency} / month`,
    brutto: monthlyBruttoFormatted,
    netto: monthlyNettoFormatted,
    notes: `~${taxPercent}% tax`,
  });

  // Yearly format
  const yearlyBrutto = monthlyBruttoTarget * 12;
  const yearlyNetto = monthlyNettoTarget * 12;
  results.push({
    format: `${target.currency} / year`,
    brutto: formatCurrency(yearlyBrutto, target.currency),
    netto: formatCurrency(yearlyNetto, target.currency),
    notes: '',
  });

  // Hourly format
  const hourlyBrutto = monthlyBruttoTarget / WORKING_HOURS_PER_MONTH;
  const hourlyNetto = monthlyNettoTarget / WORKING_HOURS_PER_MONTH;
  results.push({
    format: `${target.currency} / hour`,
    brutto: formatCurrency(hourlyBrutto, target.currency),
    netto: formatCurrency(hourlyNetto, target.currency),
    notes: '160h/month',
  });

  return results;
};

