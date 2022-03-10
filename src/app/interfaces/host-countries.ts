export interface HostCountries {
  product_id: number;
  name: string;
  iso_code: string;
  country_states: Array<Type>; // returns an array of country states, Type defined below
}

interface Type {
  id: number;
  name: string;
}
