import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FarmRoutingModule } from './farm-routing.module';
import { AuctionComponent } from './auction/auction.component';
import { BreedListComponent } from './breed-list/breed-list.component';
import { BreeddetailsComponent } from './breeddetails/breeddetails.component';
import { OrderdeliverycommmentsComponent } from './orderdeliverycommments/orderdeliverycommments.component';
import { ReadyTosellDetailsComponent } from './seller/ready-tosell-details/ready-tosell-details.component';
import { ReadyTosellInfoComponent } from './seller/ready-tosell-info/ready-tosell-info.component';
import { ReadyTosellListComponent } from './seller/ready-tosell-list/ready-tosell-list.component';
import { SellerDetailsComponent } from './seller/seller-details/seller-details.component';
import { SellerListComponent } from './seller/seller-list/seller-list.component';
import { SoldListComponent } from './seller/sold-list/sold-list.component';
import { VieworderComponent } from './seller/vieworder/vieworder.component';
import { FormsModule } from '@angular/forms';
import { AppModule } from 'src/app.module';
import { SharedModule } from 'src/shared/shared.module';

@NgModule({
  declarations: [
 
  
    AuctionComponent,
         BreedListComponent,
         BreeddetailsComponent,
         OrderdeliverycommmentsComponent,
         ReadyTosellDetailsComponent,
         ReadyTosellInfoComponent,
         ReadyTosellListComponent,
         SellerDetailsComponent,
         SellerListComponent,
         SoldListComponent,
         VieworderComponent,
         
  ],
  imports: [
    CommonModule,
    FarmRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class FarmModule { }
