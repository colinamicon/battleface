import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ClientForm } from 'src/app/interfaces/client-form';
import { DestinationCountries } from 'src/app/interfaces/destination-countries';
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
  battleForm: FormGroup;

  constructor(private quotationService: QuotationService) {}

  // OnInit: GET countries and currencies
  ngOnInit(): void {}
}


// http client - services

// interface for each get / post request TYPE
