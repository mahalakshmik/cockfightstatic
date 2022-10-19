import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth.service';
import { FmsService } from 'src/app/services/fms.service';
import { LoginService } from 'src/app/services/login.service';
import { ProductMaster } from 'src/commonFiles/profile/profile.modal';
import { Address, Member } from 'src/commonFiles/register/register.model';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-left-nav',
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.scss']
})
export class LeftNavComponent implements OnInit {
  profilePicUrl = environment.imgUrl;
  isShowAddseller: boolean = false;
  myDir: any = 'profile';
  address: any;
  formsell: any = new ProductMaster;
  forms: any = new Member;
  public adform: Address;
  profile: any;
  addresslist: any;
  orderHistory: any;
  uploadFiles: any = [];
  currencyList: any;
  genderList: any;
  breedList: any;
  ageList: any;
  selectedFiles?: FileList;
  progressInfos: any[] = [];
  message: string[] = [];
  previews: string[] = [];
  paymentList: any;
  weightList: any;
  sellerList: any;
  userID: any;
  profilePic: any;
  breedLst: any;
  breeddialogRef: any;
  loggedUserName: string | undefined
  loggedUserDetails: string | undefined
  activePage: string | undefined
  // myDir: string = 'address';
  profileImageFileOutFileLink: string = "http://viitortechnologies.com/images/4.JPG"
  //feture if iisue check this
  imgData: any;
  userType: any;
  memberType: number;
  username: any;
  isVisited: boolean=false;
  addclass:string=''
@Input() parentData: string | undefined;
  constructor(private fms: FmsService, private gs: LoginService, public as: AuthService, private spinnerService: NgxSpinnerService,
    private dialog: MatDialog, public router: Router, private activatedRoute: ActivatedRoute) {

    this.adform = new Address;
   // console.log(this.adform)
    const userDetails = this.as.getLoggedUserDetails();
    this.userID = userDetails.userId;
    this.username = userDetails.userName;
    this.memberType = userDetails.memberType;
   const userdetails = JSON.parse(localStorage.getItem('user') || '{}');
   let profilepic=userdetails.profilePhoto
   if( profilepic == null){
     this.profilePic= "../../../assets/images/pic.jpg"
   }else{
    this.profilePic= this.profilePicUrl+profilepic;
   }
 console.log(this.profilePic)
  }
  
  ngOnChanges(changes:SimpleChanges){
    if(this.parentData){
      
      this.profilePic =this.profilePicUrl+this.parentData;
      console.log(this.parentData)
    }
}
  pageNavigate(tab: string) {
    if (tab === 'profile') {
      this.router.navigate(['menu/profile']);
    } else if (tab === 'address') {
      
      this.router.navigate(['menu/address']);
    } else if (tab === 'notification') {
      this.router.navigate(['menu/notification']);
    } else if (tab === 'inbox') {
      this.router.navigate(['menu/inbox/' + this.userID + '/' + this.memberType]);
    } else if (tab === 'Verify') {
      this.router.navigate(['menu/Verify']);
    } else if (tab === 'followers') {
      this.router.navigate(['menu/FollowedList']);
    } else if (tab === 'following') {
      this.router.navigate(['menu/FollowingList']);
    } else if (tab === 'breedList') {
      this.router.navigate(['menu/breedList']);
    }
    else if (tab === 'WishList') {
      this.router.navigate(['menu/WishList']);
    }
    else if (tab === 'readytosell') {
      this.router.navigate(['menu/readytosell']);
    }
    else if (tab === 'SellingList') {
      this.router.navigate(['menu/SellingList']);
    }
    else if (tab === 'SoldOutList') {
      this.router.navigate(['menu/SoldOutList']);
    }
    else if (tab === 'orderhistory') {
      this.router.navigate(['menu/orderhistory']);
    }
    else if (tab === 'TransporterBookingList') {
      this.router.navigate(['menu/TransporterBookingList']);
    }
    else if (tab === 'breadList') {
      this.router.navigate(['/farm/BreadList']);
    }
    // this.appComponent.checkWebUrl(tab)
  }

  check(){
    alert('teste')
  }

  mobilenav(){
    this.isVisited = true;
   // console.log('test')
  }
  ngOnInit(): void {
    this.userType = this.as.getuserType();
  
  } simpleAlert() {
    Swal.fire('Hello Angular');
  }
  showtemp() {
    this.isShowAddseller = true;
  }
  editseller(sellerList: any) {
    this.isShowAddseller = true;
  
    this.formsell = sellerList;
 

  }



  onFileSelect(event: any) {

    this.message = [];
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
    this.previews = [];
    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        this.uploadFiles.push(this.selectedFiles[i])
        const reader = new FileReader();
       // console.log(this.uploadFiles)

        reader.onload = (e: any) => {
          this.previews.push(e.target.result);
         // console.log(this.previews)
        };

        reader.readAsDataURL(this.selectedFiles[i]);
      }
    }
  }

  


  



  }



 

