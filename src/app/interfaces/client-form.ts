export interface ClientForm {
  product_id: string;
  age: number;
  currency_id: string;
  destination_country_ids: string;
  host_country_id: string;
  country_state: string; // if host has states (optional)
  start_date: Date;
  end_date: Date;
  trip_cost: number;
  deposit_date: Date;
  winter_sports_extension: boolean;

  // (Response from POST)
  total: number;
  premium: number;
  tax: number;
  fees: number;
  // return_url: Url;
  quotation_id: number;
}
