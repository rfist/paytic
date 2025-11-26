import { getPPPIndex } from '../services/api';

// PPP adjustment utilities
export const applyPPPAdjustment = async (
  amount: number,
  sourceCountry: string,
  targetCountry: string
): Promise<number> => {
  const sourcePPP = await getPPPIndex(sourceCountry);
  const targetPPP = await getPPPIndex(targetCountry);
  
  if (targetPPP > 0) {
    return amount * (sourcePPP / targetPPP);
  }
  
  return amount;
};
