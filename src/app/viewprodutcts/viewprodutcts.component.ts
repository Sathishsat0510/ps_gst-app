import { Component, OnInit } from '@angular/core';
import { Services } from '../services';



@Component({
  providers: [
    Services
  ],
  selector: 'app-viewprodutcts',
  templateUrl: './viewprodutcts.component.html',
  styleUrls: ['./viewprodutcts.component.css']
})
export class ViewprodutctsComponent implements OnInit {

  getData: string[];
  constructor(private newservice: Services) {
    this.newservice.fetchData().subscribe(data => console.log(data));
  }
  ngOnInit() {
  }

}
