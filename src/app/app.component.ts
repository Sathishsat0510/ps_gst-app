import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import {MyserviceService} from './myservice.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  getData: string;
  constructor(private newservice: MyserviceService) {
  }
  fetchData() {
   // return this.http.constructor('http://localhost:3000/api').map((res: Response) => res.json());
  // return this.newsevice.fetchData().subscribe(data => console.log(data));
    // this.http.get('http://localhost:3000/api').subscribe(data => console.log(data));
  }
  ngOnInit(): void {
   const data = this.newservice.fetchData();
   console.log(data);
  }

}
