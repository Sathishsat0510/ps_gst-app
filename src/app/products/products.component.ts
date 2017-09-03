import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service' ;


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
          productid: string;
          Producname: string;
          Productdescription: string;
          rate: string
          gst: string;
  constructor(private authService: AuthService ) {}

  ngOnInit() {
  }
  onRegisterSubmit() {
    const user = {
      productid: this.productid,
      Producname: this.Producname,
      Productdescription: this.Productdescription,
      rate: this.rate,
      gst: this.gst
    };
    this.authService.authenticateUser(user).subscribe(data => {
    console.log('Connecting');
    });
  }

}
