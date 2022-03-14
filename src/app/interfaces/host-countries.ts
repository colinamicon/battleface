export interface HostCountries {
  product_id: number;
  name: string;
  iso_code: string;
  country_states: Array<Country_States>; // returns an array of country states, Type defined below
}

interface Country_States {
  id: number;
  name: string;
}
