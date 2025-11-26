import React from 'react';
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Container,
  Box,
  Typography,
  IconButton,
  Alert,
  Snackbar,
} from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { CurrentSalaryForm } from './components/CurrentSalaryForm';
import { TargetFormatForm } from './components/TargetFormatForm';
import { CalculateButton } from './components/CalculateButton';
import { ResultsTable } from './components/ResultsTable';
import { ExportButtons } from './components/ExportButtons';
import { useCalculatorStore } from './store/useCalculatorStore';
import { decodeParams } from './utils/urlParams';
import { useDebounce } from './hooks/useDebounce';

// Theme configuration with calm blue-green accent
const getTheme = (mode: 'light' | 'dark') =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#4a9b8e', // Calm teal/blue-green accent
        light: '#e0f2f0',
        dark: '#357a6f',
      },
      ...(mode === 'dark' && {
        background: {
          default: '#121212',
          paper: '#1e1e1e',
        },
      }),
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
  });

function App() {
  const { error, input, target, setInput, setTarget, calculate } = useCalculatorStore();
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [hasInitialized, setHasInitialized] = React.useState(false);
  
  // Load theme preference from localStorage or default to light
  const [mode, setMode] = React.useState<'light' | 'dark'>(() => {
    const savedMode = localStorage.getItem('themeMode');
    return (savedMode === 'dark' || savedMode === 'light') ? savedMode : 'light';
  });
  
  const theme = React.useMemo(() => getTheme(mode), [mode]);

  const toggleColorMode = () => {
    setMode((prevMode) => {
      const newMode = prevMode === 'light' ? 'dark' : 'light';
      localStorage.setItem('themeMode', newMode);
      return newMode;
    });
  };

  // Load URL parameters on mount and calculate initial results
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.toString()) {
      const decoded = decodeParams(params);
      if (decoded) {
        if (Object.keys(decoded.input).length > 0) {
          setInput(decoded.input);
        }
        if (Object.keys(decoded.target).length > 0) {
          setTarget(decoded.target);
        }
      }
    }
    setHasInitialized(true);
    // Calculate with default or URL params after a short delay
    setTimeout(() => {
      calculate();
    }, 100);
  }, [setInput, setTarget, calculate]);

  // Auto-calculate when inputs change (debounced)
  const debouncedInput = useDebounce(input, 800);
  const debouncedTarget = useDebounce(target, 800);

  React.useEffect(() => {
    if (hasInitialized && debouncedInput.amount > 0) {
      calculate();
    }
  }, [debouncedInput, debouncedTarget, hasInitialized, calculate]);

  React.useEffect(() => {
    if (error) {
      setSnackbarOpen(true);
    }
  }, [error]);

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const ThemeIcon = mode === 'dark' ? Brightness7 : Brightness4;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, color: 'text.primary', mb: 0.5 }}>
              Paytic
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
              Salary converter for humans
            </Typography>
          </Box>

          <IconButton onClick={toggleColorMode} color="secondary" sx={{ ml: 1 }}>
            <ThemeIcon />
          </IconButton>
        </Box>

        {/* Forms */}
        <CurrentSalaryForm />
        <TargetFormatForm />

        {/* Calculate Button */}
        <CalculateButton />

        {/* Error Snackbar */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>

        {/* Results */}
        <ResultsTable />
        <ExportButtons />

        {/* Footer */}
        <Box
          sx={{
            mt: 6,
            pt: 3,
            borderTop: mode === 'light' ? '1px solid #e0e0e0' : '1px solid rgba(255, 255, 255, 0.12)',
          }}
        >
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Data sources | Privacy | Made with ❤️ in Poland
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;

