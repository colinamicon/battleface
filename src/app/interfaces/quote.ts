export interface Quote {
  // Response from POST
  total: number;
  premium: number;
  tax: number;
  fees: number;
  currency_id: string;
  return_url: string; // url
  quotation_id: number;
}
