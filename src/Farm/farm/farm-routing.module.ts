import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BreedListComponent } from './breed-list/breed-list.component';
import { ReadyTosellListComponent } from './seller/ready-tosell-list/ready-tosell-list.component';
import { SellerListComponent } from './seller/seller-list/seller-list.component';
import { SoldListComponent } from './seller/sold-list/sold-list.component';

const routes: Routes = [
{
  path:'ReadyToSellList', component: ReadyTosellListComponent},
 { path:'BreadList', component: BreedListComponent},
 { path:'sellerlist', component: SellerListComponent},
 { path:'soldlist', component: SoldListComponent},
  
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FarmRoutingModule { }
