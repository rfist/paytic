import { create } from 'zustand';
import { SalaryInput, TargetConfig, CalculationResult } from '../types';
import { calculateSalary } from '../utils/calculator';

interface CalculatorState {
  input: SalaryInput;
  target: TargetConfig;
  results: CalculationResult[];
  isLoading: boolean;
  error: string | null;
  setInput: (data: Partial<SalaryInput>) => void;
  setTarget: (data: Partial<TargetConfig>) => void;
  calculate: () => Promise<void>;
}

const defaultInput: SalaryInput = {
  country: 'Poland',
  currency: 'PLN',
  amount: 130,
  period: 'hour',
  taxType: 'netto',
};

const defaultTarget: TargetConfig = {
  country: 'Poland',
  currency: 'USD',
  period: 'month',
  taxType: 'netto',
  includePPP: true,
};

export const useCalculatorStore = create<CalculatorState>((set, get) => ({
  input: defaultInput,
  target: defaultTarget,
  results: [],
  isLoading: false,
  error: null,
  setInput: (data) =>
    set((state) => ({
      input: { ...state.input, ...data },
    })),
  setTarget: (data) =>
    set((state) => ({
      target: { ...state.target, ...data },
    })),
  calculate: async () => {
    const { input, target } = get();
    
    // Validate input
    if (!input.amount || input.amount <= 0) {
      set({ error: 'Please enter a valid salary amount' });
      return;
    }

    set({ isLoading: true, error: null });

    try {
      const results = await calculateSalary(input, target);
      set({ results, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Calculation failed',
        isLoading: false,
      });
    }
  },
}));

