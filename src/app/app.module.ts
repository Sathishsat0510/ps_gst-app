import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { MyserviceService} from './myservice.service';
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { ViewprodutctsComponent } from './viewprodutcts/viewprodutcts.component';
import { FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ViewprodutctsComponent,
  ],
  imports: [
  FormsModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path : 'products',
        component : ProductsComponent
      },
      {
        path : 'viewprodutcts',
        component :  ViewprodutctsComponent
      }
    ])
  ],
  providers: [ MyserviceService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
