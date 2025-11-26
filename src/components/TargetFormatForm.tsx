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
  MenuItem,
  Checkbox,
} from '@mui/material';
import { KeyboardArrowDown } from '@mui/icons-material';
import { useCalculatorStore } from '../store/useCalculatorStore';
import { Period, Currency } from '../types';
import { COUNTRIES, CURRENCIES, getCurrencyForCountry } from '../constants';

export const TargetFormatForm: React.FC = () => {
  const { target, setTarget } = useCalculatorStore();

  const handleCountryChange = (country: string) => {
    const currency = getCurrencyForCountry(country);
    setTarget({ country, currency });
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
        STEP 2: TARGET FORMAT
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          select
          label="Target Country"
          value={target.country}
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

        <Box>
          <TextField
            select
            label="Output Currency"
            value={target.currency}
            onChange={(e) => setTarget({ currency: e.target.value as Currency })}
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
          <Typography variant="caption" sx={{ color: 'text.secondary', mt: 0.5, display: 'block' }}>
            Netto will estimate take-home based on avg. tax rates
          </Typography>
        </Box>

        <FormControl component="fieldset">
          <FormLabel component="legend">Output Period</FormLabel>
          <RadioGroup
            row
            value={target.period}
            onChange={(e) => setTarget({ period: e.target.value as Period })}
          >
            <FormControlLabel value="hour" control={<Radio color="secondary" />} label="Hourly" />
            <FormControlLabel value="month" control={<Radio color="secondary" />} label="Monthly" />
            <FormControlLabel value="year" control={<Radio color="secondary" />} label="Yearly" />
          </RadioGroup>
        </FormControl>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography>Brutto</Typography>
          <Switch
            checked={target.taxType === 'netto'}
            onChange={(e) => setTarget({ taxType: e.target.checked ? 'netto' : 'brutto' })}
            color="secondary"
          />
          <Typography>Netto</Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Checkbox
            checked={target.includePPP}
            onChange={(e) => setTarget({ includePPP: e.target.checked })}
            color="secondary"
          />
          <Typography>Include Cost of Living Adjustment (PPP)</Typography>
        </Box>
        <Typography variant="caption" sx={{ color: 'text.secondary', ml: 4 }}>
          Adjusts salary to maintain purchasing power
        </Typography>
      </Box>
    </Box>
  );
};

