# Paytic

**Salary converter for humans**

A simple web application to convert and compare salaries across different countries, currencies, and time periods. Perfect for job negotiations and understanding salary offers in context.

## Features

- Multi-currency support (PLN, USD, EUR, GBP, UAH)
- Flexible time periods (hourly, monthly, yearly)
- Tax calculations (brutto vs netto)
- Purchasing Power Parity (PPP) adjustments
- Export to CSV or share via URL
- Dark/Light theme
- 22 countries supported

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

The application will be available at `http://localhost:5173`.

## Usage

1. Enter your current salary (country, currency, amount, period)
2. Configure target format (country, currency, output preferences)
3. View results in all formats (hourly, monthly, yearly)
4. Export or share your calculation

## Notes

- Tax rates are approximations based on 2025 estimates
- Exchange rates are currently mocked (needs real API integration)
- PPP indices are rough estimates for cost of living adjustments
- Assumes 160 working hours per month
