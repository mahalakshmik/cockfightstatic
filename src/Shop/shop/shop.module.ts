import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { ShoplistComponent } from './shoplist/shoplist.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { ProductlistComponent } from './productlist/productlist.component';
import { ShopdetailsComponent } from './shopdetails/shopdetails.component';

@NgModule({
  declarations: [ShoplistComponent, AddproductComponent, ProductlistComponent, ShopdetailsComponent],
  imports: [
    CommonModule,
    ShopRoutingModule
  ]
})
export class ShopModule { }
