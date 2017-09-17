import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { MyserviceService } from './../myservice.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  productid: string;
  productname: string;
  productdescription: string;
  productrate: number;
  productgst: number;
  displaydata;

  constructor(private newservice: MyserviceService ) {
  }
  addtoproduct() {
    const product = { productname: this.productname, productdescription: this.productdescription, productrate: this.productrate,
      productgst: this.productgst
    };
    const json = JSON.stringify(product);
   this.newservice.addproduct(json).subscribe();
   this.newservice.fetchData().subscribe(res => this.displaydata = res);
  }

  addtocart(id: any) {
    this.newservice.addcart(id).subscribe( data => {
      if ( data === true) {
        alert('Added Successfully');
      } else {
        alert('Could Not Added');
      }
    });
  }
  delete(id: any) {
    const displaydata = this.displaydata;
    this.newservice.deleteproduct(id).subscribe(data => {
        if (data === true) {
          for (let i = 0; i < displaydata.length; i++) {
            if ( displaydata[i].productid === id) {
              displaydata.splice(i, 1);
            }
          }
        }
      }
    );
  }

  ngOnInit() {
    this.newservice.fetchData().subscribe(res => this.displaydata = res );
  }


}
