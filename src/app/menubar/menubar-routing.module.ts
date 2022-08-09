import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeftNavbarComponent } from 'src/commonFiles/left-navbar/left-navbar.component';
import { WishListComponent } from 'src/commonFiles/wish-list/wish-list.component';
import { SoldListComponent } from 'src/Farm/farm/seller/sold-list/sold-list.component';
import { ProductlistComponent } from 'src/Shop/shop/productlist/productlist.component';
import { AddressComponent } from './address/address.component';
import { BreedListComponent } from './breed-list/breed-list.component';
import { FollowersComponent } from './followers/followers.component';
import { FollowingComponent } from './following/following.component';
import { InboxMessageComponent } from './inbox-message/inbox-message.component';
import { LeftNavComponent } from './left-nav/left-nav.component';
import { NotificationComponent } from './notification/notification.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { ProfileComponent } from './profile/profile.component';
import { SellingComponent } from './selling/selling.component';
import { SellinglistComponent } from './sellinglist/sellinglist.component';
import { SoldoutlistComponent } from './soldoutlist/soldoutlist.component';
import { TrasnporterbookinglistComponent } from './trasnporterbookinglist/trasnporterbookinglist.component';
import { VerifydocumentComponent } from './verifydocument/verifydocument.component';
import { WishlistComponent } from './wishlist/wishlist.component';

const routes: Routes = [
  { path:'',component:LeftNavComponent},
  { path:'profile',component:ProfileComponent},
  { path:'notification',component:NotificationComponent},
  { path:'address',component:AddressComponent},
  { path:'WishList',component:WishlistComponent},
  { path:'FollowedList',component:FollowersComponent},
  { path:'FollowingList',component:FollowingComponent},
  { path:'Verify',component:VerifydocumentComponent},
  { path:'TransporterBookingList',component:TrasnporterbookinglistComponent},
  { path:'ProductList',component:ProductlistComponent},
  { path:'SellingList',component:SellinglistComponent},
  { path:'readytosell',component:SellingComponent},
  { path:'SoldOutList',component:SoldoutlistComponent},
  { path:'breedList',component:BreedListComponent},
  { path:'inbox/:senderID/:memberType',component:InboxMessageComponent},
  { path:'orderhistory',component:OrderHistoryComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenubarRoutingModule { }
