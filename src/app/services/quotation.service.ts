import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, of, tap } from 'rxjs';
import { DestinationCountries } from '../interfaces/destination-countries';
import { HostCountries } from '../interfaces/host-countries';
import { Currencies } from '../interfaces/currencies';
import { ClientForm } from '../interfaces/client-form';
import { Quote } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class QuotationService {
  // JWT token
  jwtToken =
    'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJUYW5naWVycyBJbnRlcm5hdGlvbmFsIiwiaWF0IjoxNjI4MDA4MjAxLCJleHAiOjIyNTkxNjAyMDEsIm5iZiI6MTYyODAwODIwMSwianRpIjoiVkZzU3I5TE9hbHNKN1d0QyIsImFmZmlsaWF0ZV9pZCI6MSwicHJvZHVjdF9pZHMiOnsiMSI6MiwiMiI6NiwiMyI6NywiNCI6OCwiNSI6OSwiNiI6MTAsIjciOjExLCI4IjoxMn0sInBlcm1pc3Npb25zIjpbIlFRQyIsIkdBQyIsIkdEQyIsIkdIQyIsIkdSVSJdLCJzdWIiOiJQYXJ0bmVyIEFjY2VzcyBUb2tlbiJ9.sTZsa-ufE4MkDaqKMz380HmGZjc2evxOXw9M1H1M_Xs';

  // HTTP Header Options
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.jwtToken,
    }),
  };

  // GET Destination Countries (product_id: 8):
  private destinationUrl =
    'https://coding-challenge-api.bfdevsite.com/api/v1/site/1/product/8/destination_country';

  getDestinationCountries(): Observable<DestinationCountries[]> {
    return this.http.get<DestinationCountries[]>(
      this.destinationUrl,
      this.httpOptions
    );
  }

  // GET Host Countries
  private hostUrl =
    'https://coding-challenge-api.bfdevsite.com/api/v1/site/1/product/8/host_country';

  getHostCountries(): Observable<HostCountries[]> {
    return this.http.get<HostCountries[]>(this.hostUrl, this.httpOptions);
  }

  // GET Allowed Currencies - country ID needs to replace blank in URL
  // REMOVED brackets from <country_id>
  private currencyUrl =
    'https://coding-challenge-api.bfdevsite.com/api/v1/token/product/8/country/country_id/currencies';

  getCurrencies(): Observable<Currencies[]> {
    return this.http.get<Currencies[]>(this.currencyUrl, this.httpOptions);
  }

  // POST Client Form
  // .map the returned Client Form with their input and generated Quote from API
  private quoteUrl =
    'https://coding-challenge-api.bfdevsite.com/api/v1/token/quotation';

  // 406 ERROR: "One or more inputs have been left empty."
  // Screenshot of error located in assets folder
  submitForm(formData: ClientForm): Observable<Quote> {
    return this.http.post<Quote>(this.quoteUrl, formData, this.httpOptions);
  }

  constructor(private http: HttpClient) {}
}
