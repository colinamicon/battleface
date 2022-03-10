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

  onSubmit() {
    // FormData.append
    var formData: any = new FormData();
    formData.append('product_id', this.battleForm.get('product_id').value);
    formData.append('age', this.battleForm.get('age').value);
    formData.append('currency_id', this.battleForm.get('currency_id').value);
    formData.append(
      'destination_country_ids',
      this.battleForm.get('destination_country_ids').value
    );
    formData.append(
      'host_country_id',
      this.battleForm.get('host_country_id').value
    );
    formData.append(
      'country_state',
      this.battleForm.get('country_state').value
    );
    formData.append('trip_cost', this.battleForm.get('trip_cost').value);
    formData.append('deposit_date', this.battleForm.get('deposit_date').value);
    formData.append(
      'winter_sports_extension',
      this.battleForm.get('winter_sports_extension').value
    );

    // POST Client Form onSubmit
    this.quotationService.submitForm(formData).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );


}

}
// http client - services

// interface for each get / post request TYPE
