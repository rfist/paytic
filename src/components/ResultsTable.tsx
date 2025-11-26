import React from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@mui/material';
import { useCalculatorStore } from '../store/useCalculatorStore';

export const ResultsTable: React.FC = () => {
  const { results } = useCalculatorStore();

  if (results.length === 0) {
    return null;
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
        RESULTS TABLE
      </Typography>
      <TableContainer
        component={Paper}
        sx={{
          boxShadow: 'none',
          border: (theme) =>
            theme.palette.mode === 'light' ? '1px solid #e0e0e0' : '1px solid rgba(255, 255, 255, 0.12)',
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Format</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Brutto</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Netto</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Notes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.format}</TableCell>
                <TableCell>{row.brutto}</TableCell>
                <TableCell>{row.netto}</TableCell>
                <TableCell>{row.notes || ''}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="caption" sx={{ color: 'text.secondary', mt: 1, display: 'block' }}>
        Based on 2025 avg. tax rates & 160 working hours/month
      </Typography>
    </Box>
  );
};

