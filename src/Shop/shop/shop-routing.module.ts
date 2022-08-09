import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddproductComponent } from './addproduct/addproduct.component';
import { ProductlistComponent } from './productlist/productlist.component';
import { ShopdetailsComponent } from './shopdetails/shopdetails.component';
import { ShoplistComponent } from './shoplist/shoplist.component';


const routes: Routes = [{
  path: 'shop/:id', component: ShoplistComponent
},
{
  path: 'productdetails/:ID', component: ProductlistComponent
},
{
  path: 'Addproduct', component: AddproductComponent,
},
{
  path: 'shopdetails', component: ShopdetailsComponent,
},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
