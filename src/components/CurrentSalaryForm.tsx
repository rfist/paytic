import React from 'react';
import {
  Box,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Switch,
  Typography,
  Tooltip,
  MenuItem,
} from '@mui/material';
import { KeyboardArrowDown } from '@mui/icons-material';
import { useCalculatorStore } from '../store/useCalculatorStore';
import { Period, Currency } from '../types';
import { COUNTRIES, CURRENCIES, getCurrencyForCountry } from '../constants';

export const CurrentSalaryForm: React.FC = () => {
  const { input, setInput } = useCalculatorStore();

  const handleCountryChange = (country: string) => {
    const currency = getCurrencyForCountry(country);
    setInput({ country, currency });
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
        STEP 1: YOUR CURRENT SALARY
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          select
          label="Country"
          value={input.country}
          onChange={(e) => handleCountryChange(e.target.value)}
          fullWidth
          SelectProps={{
            IconComponent: KeyboardArrowDown,
          }}
        >
          {COUNTRIES.map((country) => (
            <MenuItem key={country} value={country}>
              {country}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Currency"
          value={input.currency}
          onChange={(e) => setInput({ currency: e.target.value as Currency })}
          fullWidth
          SelectProps={{
            IconComponent: KeyboardArrowDown,
          }}
        >
          {CURRENCIES.map((currency) => (
            <MenuItem key={currency} value={currency}>
              {currency}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Amount"
          type="number"
          value={input.amount}
          onChange={(e) => setInput({ amount: parseFloat(e.target.value) || 0 })}
          fullWidth
        />

        <FormControl component="fieldset">
          <FormLabel component="legend">Period</FormLabel>
          <RadioGroup
            row
            value={input.period}
            onChange={(e) => setInput({ period: e.target.value as Period })}
          >
            <FormControlLabel value="hour" control={<Radio color="secondary" />} label="Hourly" />
            <FormControlLabel value="month" control={<Radio color="secondary" />} label="Monthly" />
            <FormControlLabel value="year" control={<Radio color="secondary" />} label="Yearly" />
          </RadioGroup>
        </FormControl>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography>Brutto</Typography>
          <Switch
            checked={input.taxType === 'netto'}
            onChange={(e) => setInput({ taxType: e.target.checked ? 'netto' : 'brutto' })}
            color="secondary"
          />
          <Typography>Netto</Typography>
          <Tooltip title="Brutto = before tax | Netto = take-home pay">
            <Typography
              variant="caption"
              sx={{ color: 'text.secondary', ml: 1, cursor: 'help' }}
            >
              ℹ️
            </Typography>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
};

