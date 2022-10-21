import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarRoutingModule } from './menubar-routing.module';
import { LeftNavComponent } from './left-nav/left-nav.component';
import { SharedModule } from 'src/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { CustomerModule } from 'src/Customer/customer/customer.module';
import { VerifydocumentComponent } from './verifydocument/verifydocument.component';
import { FollowersComponent } from './followers/followers.component';
import { FollowingComponent } from './following/following.component';
import { BreedListComponent } from './breed-list/breed-list.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { SellingComponent } from './selling/selling.component';
import { SoldoutlistComponent } from './soldoutlist/soldoutlist.component';
import { PurchaselistComponent } from './purchaselist/purchaselist.component';
import { TrasnporterbookinglistComponent } from './trasnporterbookinglist/trasnporterbookinglist.component';
import { SellinglistComponent } from './sellinglist/sellinglist.component';
import { AddressComponent } from './address/address.component';
import { ProfileComponent } from './profile/profile.component';
import { NotificationComponent } from './notification/notification.component';
import { InboxMessageComponent } from './inbox-message/inbox-message.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { AddsellerComponent } from './selling/addseller/addseller.component';
import { InboxdetailComponent } from './inbox-message/inboxdetail/inboxdetail.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';


// export function HttpLoaderFactory(httpClient: HttpClient) {
//   return new TranslateHttpLoader(httpClient, "assets/i18n/", ".json");
// }
@NgModule({
  declarations: [
    LeftNavComponent,
    VerifydocumentComponent,
    FollowersComponent,
    FollowingComponent,
    BreedListComponent,
    OrderHistoryComponent,
    SellingComponent,
    SoldoutlistComponent,
    PurchaselistComponent,
    TrasnporterbookinglistComponent,
    SellinglistComponent,
    AddressComponent,
    ProfileComponent,
    NotificationComponent,
    InboxMessageComponent,
    WishlistComponent,
    ChangepasswordComponent,
    AddsellerComponent,
    InboxdetailComponent
  ],
  imports: [
    CommonModule,
    MenubarRoutingModule, MatChipsModule,  MatAutocompleteModule, MatSelectModule,
    FormsModule,HttpClientModule,ReactiveFormsModule,SharedModule,
    CustomerModule,
    // TranslateModule.forRoot({
    //   loader: {
    //     provide: TranslateLoader,
    //     useFactory: HttpLoaderFactory,
    //     deps: [HttpClient]
    //   }
    // })
  ],
  exports:[
    LeftNavComponent
  ]
})
export class MenubarModule { }
