import { Scenario } from './types';

export const scenarios: Scenario[] = [
  {
    title: 'UCC — Nonconforming Goods',
    mode: 'standard',
    text: `Contract dispute. UCC governs. Seller delivered steel goods failing the written purchase agreement specs (wrong gauge). Buyer's receiving department signed the delivery receipt without noting defect. Buyer used 60% of the goods over 3 weeks before discovering nonconformity. Buyer now wants to reject the entire shipment and claim full refund plus consequential damages. Wisconsin. Analyze the full legal position including buyer's right to reject, acceptance, revocation of acceptance, and damages exposure.`,
  },
  {
    title: 'Employment — Pretextual Termination',
    mode: 'standard',
    text: `Employment termination. Plaintiff at-will employee, 7-year tenure, no performance issues on record. Terminated October 28th. Stock options worth approximately $340,000 vest November 1st. Employer states reason: restructuring. Plaintiff is a 54-year-old Black woman. Two employees retained in her department are white males under 40. Analyze viability of claims — Title VII, ADEA, any state law claims — and the firm's exposure if defending.`,
  },
  {
    title: '4th Amendment — Suppression Motion',
    mode: 'adversarial',
    text: `I have a 4th Amendment suppression motion I believe will prevail. Facts: police stopped vehicle for broken tail light. Without consent, without warrant, officer opened trunk after detecting odor of marijuana from outside the vehicle. Found controlled substances. My argument: automobile exception does not apply because marijuana odor alone is insufficient probable cause in a jurisdiction where marijuana is decriminalized for personal use amounts. I am confident this motion wins. Attack my position — find every vulnerability and tell me exactly how the prosecution defeats me.`,
  },
  {
    title: 'Wisconsin SOL — Discovery Rule',
    mode: 'deadend',
    text: `SOL analysis. Personal injury tort — slip and fall on commercial property. Wisconsin. Incident March 2019. Plaintiff had no immediate symptoms. Diagnosed January 2022 with degenerative spinal condition her physician attributes to the fall. Client came to us February 2024. Wisconsin Wis. Stat. 893.54. Map every available path. Declare dead ends explicitly with the exact authority and mechanism that closes each one. Do not soften this.`,
  },
];
