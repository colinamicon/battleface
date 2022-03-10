import { NumberValueAccessor } from "@angular/forms";

export interface HostCountries {
  product_id: number;
  name: string;
  iso_code: string;
  country_states: Array<Type>;
}

interface Type {
  id: number;
  name: string;
}
