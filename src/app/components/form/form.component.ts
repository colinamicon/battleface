import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ClientForm } from 'src/app/interfaces/client-form';
import { DestinationCountries } from 'src/app/interfaces/destination-countries';
import { HostCountries } from 'src/app/interfaces/host-countries';
import { QuotationService } from 'src/app/services/quotation.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  // initialize
  clientForm: ClientForm[];
  destinationCountries: DestinationCountries[];
  hostCountries: HostCountries[];
  battleForm: FormGroup;

  constructor(
    private quotationService: QuotationService,
    private formBuilder: FormBuilder,
  ) {
    // reactive form: battleForm (FormBuilder Constructor)
    this.battleForm = this.formBuilder.group({
      product_id: 8,
      age: '',
      currency_id: '',
      destination_country_ids: '',
      host_country_id: '',
      country_state: '',
      start_date: '',
      end_date: '',
      trip_cost: '',
      deposit_date: '',
      winter_sports_extension: '',
    });
  }

  ngOnInit(): void {
    // Subscriptions
    // GET Destination Countries
    this.quotationService
      .getDestinationCountries()
      .subscribe(
        (data: DestinationCountries[]) => (this.destinationCountries = data)
      );

    // GET Host Countries
    this.quotationService
      .getHostCountries()
      .subscribe((data: HostCountries[]) => (this.hostCountries = data));

    // GET Currencies
  }

  ngOnChanges(): void {
    // .split(',') ages by commas

  }


  onSubmit(formValues: ClientForm[]): void {
    let formData: ClientForm[] = <ClientForm[]>formValues;

    // Subscribe to Client Form POST onSubmit
    this.quotationService
      .submitForm(formData)
      .subscribe({ complete: console.info });
  }
}
