import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()

export class Services {
  constructor(private http: HttpClient) {
  }
  fetchData() {
   return this.http.get('http://localhost:3000/api').map((res: Response) => res.json());
  }
}
