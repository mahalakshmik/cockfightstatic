import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FmsService } from 'src/app/services/fms.service';
import { LoginService } from 'src/app/services/login.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { AddaddressComponent } from '../addAddress/addaddress/addaddress.component';
import { ProductMaster } from '../profile/profile.modal';
import { Address, Member } from '../register/register.model';
@Component({
  selector: 'app-left-navbar',
  templateUrl: './left-navbar.component.html',
  styleUrls: ['./left-navbar.component.scss']
})
export class LeftNavbarComponent implements OnInit {

  imgUrl: string | undefined;
  loggedUserName: string | undefined
  loggedUserDetails: string | undefined
  activePage: string | undefined
  myDir: string = 'address';
  profileImageFileOutFileLink: string = "http://viitortechnologies.com/images/4.JPG"
  private imgURL = environment.imgUrl;
  imgData: any;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {

    var usrMoreInfo = localStorage.getItem("viitor.usrMoreInfoObj")

    if (!usrMoreInfo) {

    } else {
      // this.profileImageFileOutFileLink = localStorage.getItem("viitor.profileImg")

    }
  }

  ngOnInit() {
    
    this.imgData = JSON.parse(localStorage.getItem('userdetails') || '{}')
    console.log(this.imgData)
    this.imgURL = this.imgURL + this.imgData.profilePhoto;
    this.profileImageFileOutFileLink = this.imgURL;
    console.log(this.imgURL)
    this.activePage = this.activatedRoute.snapshot.url[0].path //activate left side menu

  }
  pageNavigate(tab: string) {
    if (tab === 'profile') {
      this.router.navigate(['/profile']);
    } else if (tab === 'address') {
      this.router.navigate(['/Addressdelivery']);
    } else if (tab === 'notification') {
      this.router.navigate(['/customer/notication']);
    } else if (tab === 'inbox') {
      this.router.navigate(['/customer/inbox']);
    } else if (tab === 'verify') {
      this.router.navigate(['/customer/verify']);
    } else if (tab === 'followers') {
      this.router.navigate(['/customer/followers']);
    } else if (tab === 'following') {
      this.router.navigate(['/customer/following']);
    } else if (tab === 'breadList') {
      this.router.navigate(['/farm/BreadList']);
    }
    // else if (tab === 'orderHistory') {
    //   this.router.navigate(['/customer/OrderHistory']);
    // }
    else if (tab === 'readyToSellList') {
      this.router.navigate(['/farm/ReadyToSellList']);
    }
    else if (tab === 'sellerlist') {
      this.router.navigate(['/farm/sellerlist']);
    }
    else if (tab === 'soldlist') {
      this.router.navigate(['/farm/soldlist']);
    }
    else if (tab === 'orderHistory') {
      this.router.navigate(['/customer/OrderHistory']);
    }
    else if (tab === 'bookinglist') {
      this.router.navigate(['/transport/bookinglist']);
    }
    else if (tab === 'breadList') {
      this.router.navigate(['/farm/BreadList']);
    }
    // this.appComponent.checkWebUrl(tab)
  }



}
