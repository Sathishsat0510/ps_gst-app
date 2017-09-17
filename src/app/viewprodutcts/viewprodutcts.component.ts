import {Component, NgModule, OnInit} from '@angular/core';
import {AppComponent} from '../app.component';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import { MyserviceService } from './../myservice.service';

@Component({
  selector: 'app-viewprodutcts',
  templateUrl: './viewprodutcts.component.html',
  styleUrls: ['./viewprodutcts.component.css']
})
export class ViewprodutctsComponent implements OnInit {
  displaydata;

  constructor(private newservice: MyserviceService ) {
  }
  delete(id: any) {
    const displaydata = this.displaydata;
    this.newservice.deletecartproduct(id).subscribe(data => {
      if (data === true) {
          for (let i = 0; i < displaydata.length; i++) {
            if ( displaydata[i].cartid === id) {
              displaydata.splice(i, 1);
            }
          }
      }
      }
    );
  }
  ngOnInit() {
    this.newservice.displaycart().subscribe(res => this.displaydata = res );
    console.log(this.displaydata);
  }

}
