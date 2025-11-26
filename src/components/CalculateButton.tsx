import React from 'react';
import { Button, CircularProgress } from '@mui/material';
import { useCalculatorStore } from '../store/useCalculatorStore';

export const CalculateButton: React.FC = () => {
  const { calculate, isLoading } = useCalculatorStore();

  const handleClick = () => {
    calculate();
  };

  return (
    <Button
      variant="contained"
      color="secondary"
      fullWidth
      onClick={handleClick}
      disabled={isLoading}
      sx={{
        py: 1.5,
        fontSize: '1rem',
        fontWeight: 600,
        textTransform: 'uppercase',
        mt: 2,
      }}
    >
      {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Calculate'}
    </Button>
  );
};

