import { Currency } from '../types';

export const formatCurrency = (amount: number, currency: Currency): string => {
  try {
    // Map currencies to their proper display format
    const currencyMap: Record<Currency, { code: string; symbol?: string }> = {
      USD: { code: 'USD' },
      EUR: { code: 'EUR' },
      GBP: { code: 'GBP' },
      PLN: { code: 'PLN' },
      UAH: { code: 'UAH' },
    };

    const currencyInfo = currencyMap[currency];
    if (!currencyInfo) {
      // Fallback for unknown currencies
      return `${currency} ${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }

    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyInfo.code,
      minimumFractionDigits: ['USD', 'EUR', 'GBP'].includes(currency) ? 2 : 0,
      maximumFractionDigits: ['USD', 'EUR', 'GBP'].includes(currency) ? 2 : 2,
    });
    return formatter.format(amount);
  } catch (error) {
    // Fallback formatting if Intl fails
    return `${currency} ${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
};

