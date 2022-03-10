import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { DestinationCountries } from '../interfaces/destination-countries';
import { HostCountries } from '../interfaces/host-countries';
import { Currencies } from '../interfaces/currencies';

@Injectable({
  providedIn: 'root',
})
export class QuotationService {
  // JWT token
  jwtToken =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJUYW5naWVycyBJbnRlcm5hdGlvbmFsIiwiaWF0IjoxNjI4MDA4MjAxLCJleHAiOjIyNTkxNjAyMDEsIm5iZiI6MTYyODAwODIwMSwianRpIjoiVkZzU3I5TE9hbHNKN1d0QyIsImFmZmlsaWF0ZV9pZCI6MSwicHJvZHVjdF9pZHMiOnsiMSI6MiwiMiI6NiwiMyI6NywiNCI6OCwiNSI6OSwiNiI6MTAsIjciOjExLCI4IjoxMn0sInBlcm1pc3Npb25zIjpbIlFRQyIsIkdBQyIsIkdEQyIsIkdIQyIsIkdSVSJdLCJzdWIiOiJQYXJ0bmVyIEFjY2VzcyBUb2tlbiJ9.sTZsa-ufE4MkDaqKMz380HmGZjc2evxOXw9M1H1M_Xs';

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
      this.destinationUrl,this.httpOptions);
  }

  // GET Host Countries
  private hostUrl =
    'https://coding-challenge-api.bfdevsite.com/api/v1/site/1/product/8/host_country';

  getHostCountries(): Observable<HostCountries[]> {
    return this.http.get<HostCountries[]>(this.hostUrl, this.httpOptions);
  }

  // GET Allowed Currencies - country ID needs to replace blank in URL
  private currencyUrl =
    'https://coding-challenge-api.bfdevsite.com/api/v1/token/product/8/country/<country_id>/currencies';

  getCurrencies(): Observable<Currencies[]> {
    return this.http.get<Currencies[]>(this.currencyUrl, this.httpOptions);
  }

  // POST form

  constructor(private http: HttpClient) {}
}
