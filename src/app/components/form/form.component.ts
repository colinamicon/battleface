import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClientForm } from 'src/app/interfaces/client-form';
import { Currencies } from 'src/app/interfaces/currencies';
import { DestinationCountries } from 'src/app/interfaces/destination-countries';
import { HostCountries } from 'src/app/interfaces/host-countries';
import { QuotationService } from 'src/app/services/quotation.service';
import { Quote } from 'src/app/interfaces/quote';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  // initialize
  // Implement RxJs behavior subjects
  clientForm: ClientForm[] = [];
  destinationCountries: DestinationCountries[] = [];
  hostCountries: HostCountries[] = [];
  currencies: Currencies[] = [];
  quote: Quote[] = [];
  battleForm: FormGroup;
  dc$: any; // GET Destination Countries
  hc$: any; // GET Host Countries
  c$: any; // GET Currencies
  // fakeQuote: Quote[] = [];

  constructor(
    private quotationService: QuotationService,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe
  ) {
    // DatePipe: added to app module providers
    this.datePipe.transform(Date.now(), 'yyyy-MM-dd');

    // reactive form: battleForm (FormBuilder Constructor)
    this.battleForm = this.formBuilder.group({
      product_id: 8,
      age: ['', [Validators.required, Validators.min(18)]],
      currency_id: ['', Validators.required],
      destination_country_ids: ['', Validators.required],
      host_country_id: ['', Validators.required],
      country_state: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      trip_cost: ['', Validators.required],
      deposit_date: ['', Validators.required],
      winter_sports_extension: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Subscriptions
    // TODO: Implement combineLatest: all requests combined into one data stream
    // Implement async pipe in template

    // GET Destination Countries
    this.dc$ = this.quotationService
      .getDestinationCountries()
      .subscribe(
        (data: DestinationCountries[]) => (this.destinationCountries = data)
      );

    // GET Host Countries
    this.hc$ = this.quotationService
      .getHostCountries()
      .subscribe((data: HostCountries[]) => (this.hostCountries = data));

    // GET Currencies
    this.c$ = this.quotationService
      .getCurrencies()
      .subscribe((data: Currencies[]) => (this.currencies = data));
  }
  /**
   * Fake Quote to simulate quotationService due to 406 Error
   * Http Post called onSubmit below
   */
  displayedColumns = ['total', 'premium', 'tax', 'fees', 'currency_id', 'return_url', 'quotation_id'];
  fakeQuote: Quote[] = [
    {
      total: 28.43,
      premium: 8.43,
      tax: 13,
      fees: 7,
      currency_id: 'EUR',
      return_url: 'https://',
      quotation_id: 42,
    },
  ];
  dataSource = this.fakeQuote;

  // toggle form on submit click
  public show: boolean = false;
  showForm() {
    this.show = !this.show;
  }

  // Split ages by commas
  agesChanged(age: string) {
    let ages: string[];
    ages = age.split(',');
  }

  onSubmit(formValues: ClientForm): void {
    // log Client Form to console
    console.log(this.battleForm.value);

    // Subscribe to Client Form POST onSubmit
    let formData: ClientForm = <ClientForm>formValues;
    this.quotationService
      .submitForm(formData)
      .subscribe({ error: console.error, complete: console.info });
  }

  ngOnDestroy() {
    // Prevent Memory Leak
    // Remove once combineLatest is implemented with async pipe
    // All http requests will be combined in one data stream
    this.dc$.unsubscribe;
    this.hc$.unsubscribe;
    this.c$.unsubscribe;
  }
}
