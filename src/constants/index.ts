import { Currency } from '../types';

export const COUNTRIES = [
  'Poland',
  'United States',
  'Ukraine',
  'Germany',
  'United Kingdom',
  'France',
  'Spain',
  'Italy',
  'Netherlands',
  'Sweden',
  'Switzerland',
  'Canada',
  'Australia',
  'Japan',
  'South Korea',
  'China',
  'India',
  'Brazil',
  'Mexico',
  'Czech Republic',
  'Hungary',
  'Romania',
];

export const CURRENCIES: Currency[] = ['PLN', 'USD', 'UAH', 'EUR', 'GBP'];

export const getCurrencyForCountry = (country: string): Currency => {
  const map: Record<string, Currency> = {
    Poland: 'PLN',
    'United States': 'USD',
    Ukraine: 'UAH',
    Germany: 'EUR',
    'United Kingdom': 'GBP',
    France: 'EUR',
    Spain: 'EUR',
    Italy: 'EUR',
    Netherlands: 'EUR',
    Sweden: 'EUR',
    Switzerland: 'EUR',
    Canada: 'USD',
    Australia: 'USD',
    Japan: 'USD',
    'South Korea': 'USD',
    China: 'USD',
    India: 'USD',
    Brazil: 'USD',
    Mexico: 'USD',
    'Czech Republic': 'EUR',
    Hungary: 'EUR',
    Romania: 'EUR',
  };
  return map[country] || 'USD';
};

export const WORKING_HOURS_PER_MONTH = 160;
