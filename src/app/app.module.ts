import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { ViewprodutctsComponent } from './viewprodutcts/viewprodutcts.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ViewprodutctsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
