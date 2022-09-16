import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { AddressDetailsComponent } from './address/address-details/address-details.component';
import { CustomerAdressComponent } from './customer-adress/customer-adress.component';
import { FollowedlistComponent } from './followedlist/followedlist.component';
import { FollowinglistComponent } from './followinglist/followinglist.component';
import { SendmessageComponent } from './sendmessage/sendmessage.component';
import { NotificationsComponent } from './notification/notifications/notifications.component';
import { NotificationListComponent } from './notification/notification-list/notification-list.component';
import { ConfirmorderPaymentComponent } from './payment/confirmorder-payment/confirmorder-payment.component';
import { OrdersummaryComponent } from './payment/ordersummary/ordersummary.component';
import { PostdetailsComponent } from './post/postdetails/postdetails.component';
import { CartitemsComponent } from './product/cartitems/cartitems.component';
import { ProdcutDetailsComponent } from './product/prodcut-details/prodcut-details.component';
import { ProdcutmasterListComponent } from './product/prodcutmaster-list/prodcutmaster-list.component';
import { InboxComponent } from './profile/inbox/inbox.component';
import { InboxDetailsComponent } from './profile/inbox-details/inbox-details.component';
import { OrderHistoryComponent } from './profile/order-history/order-history.component';
import { VerifyComponent } from './profile/verify/verify.component';
import { CustomerAddressComponent } from './address/customer-address/customer-address.component';
import { MaterialExampleModule } from 'src/material.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/shared/shared.module';
import { NgImageSliderModule } from 'ng-image-slider';
import { CommentboxComponent } from './product/commentbox/commentbox.component';
import { CommentsListComponent } from './product/comments-list/comments-list.component';
import { ProductdetailComponent } from './product/productdetails/productdetail/productdetail.component';
import { VediolistComponent } from './product/productvediolist/vediolist/vediolist.component';
@NgModule({
  declarations: [
    CustomerAddressComponent,
    AddressDetailsComponent,
    CustomerAdressComponent,
    FollowedlistComponent,
    FollowinglistComponent,
    SendmessageComponent,
    NotificationsComponent,
    NotificationListComponent,
    ConfirmorderPaymentComponent,
    OrdersummaryComponent,
    PostdetailsComponent,
    CartitemsComponent,
    ProdcutDetailsComponent,
    ProdcutmasterListComponent,
    InboxComponent,
    InboxDetailsComponent,
    OrderHistoryComponent,
    VerifyComponent,
    CommentboxComponent,
    CommentsListComponent,
    ProductdetailComponent,
    VediolistComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    MaterialExampleModule,FormsModule,SharedModule,NgImageSliderModule
  ],
  exports: [
  NotificationsComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class CustomerModule { }
