import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ClientForm } from 'src/app/interfaces/client-form';
import { DestinationCountries } from 'src/app/interfaces/destination-countries';
import { HostCountries } from 'src/app/interfaces/host-countries';
import { QuotationService } from 'src/app/services/quotation.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
    private http: HttpClient
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
          .subscribe(
            (data: HostCountries[]) => (this.hostCountries = data)
          );


    // GET Currencies
  }

  onSubmit(formValues: any): void {
    let formData: ClientForm = <ClientForm>formValues;

    // POST Client Form onSubmit
    this.quotationService.submitForm(formData)
    .subscribe(
      (data: ClientForm) => console.log(data),
      //(err: any) => console.log(err)
    );

}

}
// http client - services

// interface for each get / post request TYPE
