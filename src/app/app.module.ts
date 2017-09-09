import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { ViewprodutctsComponent } from './viewprodutcts/viewprodutcts.component';
import { EditproductComponent } from './editproduct/editproduct.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ViewprodutctsComponent,
    EditproductComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {
        path : 'products',
        component : ProductsComponent
      },
      {
        path : 'viewprodutcts',
        component :  ViewprodutctsComponent
      },
      {
        path : 'editproduct',
        component :  EditproductComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
