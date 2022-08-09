import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app/app-routing.module';
import { AppComponent } from './app/app.component';
import { HeaderComponent } from 'src/commonFiles/header/header.component';
import { FooterComponent } from './commonFiles/footer/footer.component';
import { HomeComponent } from './commonFiles/home/home.component';
import { ProfileComponent } from './commonFiles/profile/profile.component';
import { DownloadappComponent } from './commonFiles/downloadapp/downloadapp.component';
import { AboutusComponent } from './commonFiles/aboutus/aboutus.component';
import { ContactusComponent } from './commonFiles/contactus/contactus.component';
import { AddressdeliveryComponent } from './commonFiles/addressdelivery/addressdelivery.component';
import { MaterialExampleModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './commonFiles/register/register.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './commonFiles/login/login.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AddaddressComponent } from './commonFiles/addAddress/addaddress/addaddress.component';
import { LeftNavbarComponent } from './commonFiles/left-navbar/left-navbar.component';
import { SharedModule } from './shared/shared.module';
import { WishListComponent } from './commonFiles/wish-list/wish-list.component';
import { PaymentComponent } from './commonFiles/payment/payment.component';
import { PaymentsuccesComponent } from './commonFiles/payment/paymentsucces/paymentsucces.component';
import { PostcommentsComponent } from './commonFiles/postcomments/postcomments.component';

@NgModule({
  declarations: [
    AppComponent,HeaderComponent, FooterComponent, HomeComponent, ProfileComponent,
     DownloadappComponent, AboutusComponent, ContactusComponent, AddressdeliveryComponent,
      RegisterComponent,LoginComponent, AddaddressComponent, WishListComponent, PaymentComponent, PaymentsuccesComponent, PostcommentsComponent,
  ],
  imports: [
    BrowserModule,BrowserAnimationsModule,CommonModule,
    AppRoutingModule,
    // MatProgressSpinnerModule,
    // MaterialExampleModule,
    FormsModule,HttpClientModule,ReactiveFormsModule,SharedModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
