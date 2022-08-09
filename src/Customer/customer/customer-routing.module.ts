import {  NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FollowedlistComponent } from './followedlist/followedlist.component';
import { FollowinglistComponent } from './followinglist/followinglist.component';
import { NotificationsComponent } from './notification/notifications/notifications.component';
import { ConfirmorderPaymentComponent } from './payment/confirmorder-payment/confirmorder-payment.component';
import { OrdersummaryComponent } from './payment/ordersummary/ordersummary.component';
import { ProdcutDetailsComponent } from './product/prodcut-details/prodcut-details.component';
import { InboxComponent } from './profile/inbox/inbox.component';
import { OrderHistoryComponent } from './profile/order-history/order-history.component';
import { VerifyComponent } from './profile/verify/verify.component';

const routes: Routes = [
  {path:'ProdcutDetails/:productID/:sellerID', component:ProdcutDetailsComponent},
  {path:'OrderSummuary', component:OrdersummaryComponent},
  {path:'OrderHistory', component:OrderHistoryComponent},
  {path:'notication', component:NotificationsComponent},
  {path:'inbox', component:InboxComponent},
  {path:'verify', component:VerifyComponent},
  {path:'followers', component:FollowedlistComponent},
  {path:'following', component:FollowinglistComponent},
  {path:'confirmorder', component:ConfirmorderPaymentComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
