import { Client } from 'lago-javascript-client';

export const lago = Client(process.env.LAGO_API_KEY || '', {
  baseUrl: process.env.LAGO_API_URL || 'https://api.getlago.com/api/v1',
});

export const PLAN_CODES: Record<string, string> = {
  monthly: 'listcraft_monthly',
  payg_10: 'listcraft_payg_10',
  payg_50: 'listcraft_payg_50',
};
