import React from 'react';
import { Box, Button, Snackbar, Alert } from '@mui/material';
import { useCalculatorStore } from '../store/useCalculatorStore';
import { encodeParams } from '../utils/urlParams';
import Papa from 'papaparse';

export const ExportButtons: React.FC = () => {
  const { results, input, target } = useCalculatorStore();
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');

  const handleCopyAll = () => {
    const text = results
      .map((r) => `${r.format}\t${r.brutto}\t${r.netto}\t${r.notes || ''}`)
      .join('\n');
    navigator.clipboard.writeText(text);
    setSnackbarMessage('Results copied to clipboard!');
    setSnackbarOpen(true);
  };

  const handleExportCSV = () => {
    const csv = Papa.unparse(results);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'salarysync-results.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    setSnackbarMessage('CSV exported successfully!');
    setSnackbarOpen(true);
  };

  const handleShareLink = () => {
    const params = encodeParams(input, target);
    const url = `${window.location.origin}${window.location.pathname}?${params}`;
    navigator.clipboard.writeText(url);
    setSnackbarMessage('Share link copied to clipboard!');
    setSnackbarOpen(true);
  };

  if (results.length === 0) {
    return null;
  }

  return (
    <>
      <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
        <Button
          variant="outlined"
          onClick={handleCopyAll}
          sx={{
            borderColor: 'secondary.main',
            color: 'secondary.main',
            '&:hover': {
              borderColor: 'secondary.dark',
              backgroundColor: 'secondary.light',
            },
          }}
        >
          Copy All
        </Button>
        <Button
          variant="outlined"
          onClick={handleExportCSV}
          sx={{
            borderColor: 'secondary.main',
            color: 'secondary.main',
            '&:hover': {
              borderColor: 'secondary.dark',
              backgroundColor: 'secondary.light',
            },
          }}
        >
          Export CSV
        </Button>
        <Button
          variant="outlined"
          onClick={handleShareLink}
          sx={{
            borderColor: 'secondary.main',
            color: 'secondary.main',
            '&:hover': {
              borderColor: 'secondary.dark',
              backgroundColor: 'secondary.light',
            },
          }}
        >
          Share Link
        </Button>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

