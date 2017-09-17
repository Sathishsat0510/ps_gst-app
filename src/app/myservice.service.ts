import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class MyserviceService {
  displaydata;

  constructor(private http: HttpClient ) {
  }
  addcart(id) {
    return this.http.get('http://localhost:3000/cart/add/' + id).map(data => this.displaydata = data);
  }
  fetchData() {
   return this.http.get('http://localhost:3000/api').map (data => this.displaydata = data );
  }
  addproduct(newproduct) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/insert', newproduct, { headers: headers}).map(data => console.log(data));
  }
  deleteproduct(id) {
    return this.http.delete('http://localhost:3000/delete/' + id).map(data => this.displaydata = data);
  }
  displaycart() {
    return this.http.get('http://localhost:3000/cart/display').map (data => this.displaydata = data );
  }
  deletecartproduct(id) {
    return this.http.delete('http://localhost:3000/cart/delete/' + id).map(data => this.displaydata = data);
  }
}
