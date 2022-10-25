import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutusComponent } from 'src/commonFiles/aboutus/aboutus.component';
import { AddressdeliveryComponent } from 'src/commonFiles/addressdelivery/addressdelivery.component';
import { ContactusComponent } from 'src/commonFiles/contactus/contactus.component';
import { DownloadappComponent } from 'src/commonFiles/downloadapp/downloadapp.component';
import { HomeComponent } from 'src/commonFiles/home/home.component';
import { LeftNavbarComponent } from 'src/commonFiles/left-navbar/left-navbar.component';
import { LoginComponent } from 'src/commonFiles/login/login.component';
import { PaymentComponent } from 'src/commonFiles/payment/payment.component';
import { PaymentsuccesComponent } from 'src/commonFiles/payment/paymentsucces/paymentsucces.component';
import { PostcommentsComponent } from 'src/commonFiles/postcomments/postcomments.component';
import { PrivacyComponent } from 'src/commonFiles/privacy/privacy';
import { ProfileComponent } from 'src/commonFiles/profile/profile.component';
import { RegisterComponent } from 'src/commonFiles/register/register.component';
import { TermsComponent } from 'src/commonFiles/terms/terms';
import { WishListComponent } from 'src/commonFiles/wish-list/wish-list.component';
import { CartitemsComponent } from 'src/Customer/customer/product/cartitems/cartitems.component';

const routes: Routes = [{
  path:'profile',component:ProfileComponent},
 { path:'',component:HomeComponent},
 { path:'app',component:PostcommentsComponent},
 { path:'downloadapp',component:DownloadappComponent},
 { path:'contactus',component:ContactusComponent},
 { path:'aboutus',component:AboutusComponent},
 { path:'Addressdelivery',component:AddressdeliveryComponent},
 { path:'login',component:LoginComponent},
 { path:'register',component:RegisterComponent},
 { path:'Cartitems',component:CartitemsComponent},
 { path:'left',component:LeftNavbarComponent},
 { path:'wishlist',component:WishListComponent},
 { path:'payment',component:PaymentComponent},
 { path:'terms',component:TermsComponent},
 { path:'privacypolicy',component:PrivacyComponent},
 { path:'succuesspayment',component:PaymentsuccesComponent},
  { path: 'transport', loadChildren: () => import('src/Transport/transport/transport.module').then(m => m.TransportModule) },
  { path: 'shop', loadChildren: () => import('src/Shop/shop/shop.module').then(m => m.ShopModule) },
  { path: 'customer', loadChildren: () => import('src/Customer/customer/customer.module').then(m => m.CustomerModule) },
  { path: 'farm', loadChildren: () => import('src/Farm/farm/farm.module').then(m => m.FarmModule) },
  { path: 'menu', loadChildren: () => import('src/app/menubar/menubar.module').then(m => m.MenubarModule) },

 
];
  
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
