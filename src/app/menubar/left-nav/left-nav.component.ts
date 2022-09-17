import { Component, OnInit } from '@angular/core';
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
  imgUrl: string | undefined;
  loggedUserName: string | undefined
  loggedUserDetails: string | undefined
  activePage: string | undefined
  // myDir: string = 'address';
  profileImageFileOutFileLink: string = "http://viitortechnologies.com/images/4.JPG"
   imgURL = environment.imgUrl;
  imgData: any;
  userType: any;
  memberType: number;
  username: any;
  isVisited: boolean=false;
  addclass:string=''

  constructor(private fms: FmsService, private gs: LoginService, public as: AuthService, private spinnerService: NgxSpinnerService,
    private dialog: MatDialog, private router: Router, private activatedRoute: ActivatedRoute) {

    this.adform = new Address;
    console.log(this.adform)
    const userDetails = this.as.getLoggedUserDetails();
    this.userID = userDetails.userId;
    this.username = userDetails.userName;
    this.memberType = userDetails.memberType;
   // var usrMoreInfo = localStorage.getItem("viitor.usrMoreInfoObj")

    // if (!usrMoreInfo) {

    // } else {
    //   // this.profileImageFileOutFileLink = localStorage.getItem("viitor.profileImg")

    // }
  }
  

  pageNavigate(tab: string) {
    if (tab === 'profile') {
      this.router.navigate(['menu/profile']);
    } else if (tab === 'address') {
      debugger
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



  mobilenav(){debugger
    this.isVisited = true;
    console.log('test')
    alert('test')
  }
  ngOnInit(): void {
    this.userType = this.as.getuserType();
    //  this.getBread()
    // this.getSellerList();
    //   this.getProfile();

    // this.getCurrenyList();
    // this.getGender();
    // this.getAgeList();
    // this.getBreadType();
    // this.getPaymentTypeList();
    // this.getWeight();
    // this.formsell.gender = '';
    // this.formsell.breedType = '';
    // this.formsell.ageType = '';
    // this.formsell.uom = '';
    // this.formsell.currency = '';
    // this.formsell.paymentOption = '';
    // this.forms.memberType = 0;


    this.imgData = JSON.parse(localStorage.getItem('user') || '{}')
    console.log(this.imgData)
    this.imgURL = this.imgURL + this.imgData.profilePhoto;

    //this.profileImageFileOutFileLink = this.imgURL;
    console.log(this.imgURL)
    // this.activePage = this.activatedRoute.snapshot.url[0].path //activate left side menu
  } simpleAlert() {
    Swal.fire('Hello Angular');
    //this.saveaddress()
  }
  showtemp() {
    this.isShowAddseller = true;
  }
  editseller(sellerList: any) {
    this.isShowAddseller = true;
    //this.formsell.index=i;
    // data:rowdata;
    this.formsell = sellerList;
    //  console.log('edit',rowdata)
    console.log('edit', sellerList)

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
        console.log(this.uploadFiles)

        reader.onload = (e: any) => {
          this.previews.push(e.target.result);
          console.log(this.previews)
        };

        reader.readAsDataURL(this.selectedFiles[i]);
      }
    }
  }

  getCurrenyList() {
    this.fms.getSellCurrencyDropList().subscribe(res => {
      console.log(res);
      this.currencyList = res;
    })
  }
  getGender() {
    this.fms.getSellGenderDropList().subscribe(res => {
      console.log(res);
      this.genderList = res;
    })
  }
  getWeight() {
    this.fms.getSellWeightDropList().subscribe(res => {
      console.log(res);
      this.weightList = res;
    })
  }
  getBreadType() {
    this.fms.getSellBreedTypeDropList().subscribe(ress => {
      console.log(ress);
      this.breedList = ress;
    })
  }
  getAgeList() {
    this.fms.getSellAgeDropList().subscribe(ress => {
      console.log(ress);
      this.ageList = ress;
    })
  }
  getPaymentTypeList() {
    this.fms.getSellPaymentTypeDropList().subscribe(ress => {
      console.log(ress);
      this.paymentList = ress;
    })
  }

  // getSellerList() {
  //   this.fms.getSellerList().subscribe(res => {
  //     console.log(res)
  //     this.sellerList = res;
  //     console.log('seller', this.sellerList.result)
  //   })
  // }

  createsell() {
    this.spinnerService.show();
    console.log(this.formsell)

    var formdata = new FormData();
    formdata.append("ProductId", "0");
    formdata.append("ProductCode", "0");
    formdata.append("ProductName", this.formsell.productName);
    formdata.append("ProductType", "2165");
    formdata.append("Gender", this.formsell.gender);
    formdata.append("BreedType", this.formsell.breedType);
    formdata.append("SellerId", "11025");
    formdata.append("Talents", this.formsell.talents);
    formdata.append("FightingRecord", this.formsell.fightingRecord);
    formdata.append("ProductBrand", "NULL");
    formdata.append("DateOfBirth", "1964-12-16T01:00:34.149Z");
    formdata.append("Uom", this.formsell.uom);
    formdata.append("Weight", this.formsell.weight);
    formdata.append("StandardPrice", "20");
    formdata.append("Discount", this.formsell.discount);
    formdata.append("Currency", this.formsell.currency);
    formdata.append("PaymentOption", this.formsell.paymentOption);
    formdata.append("ProductImage", "NULL");
    formdata.append("Remarks", "fugiat");
    formdata.append("IsActive", "false");
    formdata.append("IsAvailable", "false");
    formdata.append("StockQty", this.formsell.stockQty);
    formdata.append("CreatedOn", "1944-05-31T06:21:21.373Z");
    formdata.append("ModifiedOn", "1974-05-13T00:14:37.989Z");
    formdata.append("Age", this.formsell.age);
    formdata.append("Breed", this.formsell.breed);
    formdata.append("Province", this.formsell.province);
    formdata.append("AgeType", this.formsell.ageType);
    for (var i = 0; i < this.uploadFiles.length; i++) {
      formdata.append("uploadProductImages", this.uploadFiles[i]);
    }
    console.log(formdata);
    this.fms.saveSeller(formdata).subscribe(res => {
      console.log(res)
      if (res) {
        this.spinnerService.hide();
      }
    })

  }

  test(i: number) {
    this.previews.splice(i, 1);

  }
  onSubmit() {
    console.log(this.forms)

    const formData = new FormData();
    formData.append("UserId", this.userID);
    formData.append("userName", this.forms.userName);
    formData.append("password", this.forms.password);
    formData.append("firstName", this.forms.firstName);
    formData.append("lastName", this.forms.lastName);
    formData.append("emailId", this.forms.emailId);
    formData.append("memberType", this.forms.memberType);
    formData.append("mobileNo", this.forms.mobileNo);
    formData.append("IsActive", "true");
    formData.append("CreatedOn", "2018-12-18T05:05:14.914Z");
    formData.append("AboutUs", "test");
    formData.append("Website", this.forms.website);
    formData.append("ProfilePhoto", this.forms.ProfilePhoto);
    formData.append("IsAcceptedTermsConditions", "false");
    formData.append("FileName", this.profilePic);
    this.gs.userRegisterUpdate(formData).subscribe(res => {
      console.log(res)
      if (res) {
        Swal.fire({
          icon: 'success',
          title: "Profile Updated Succesfully!",
          // text: "You clicked the button!",
          // type: "success",
          timer: 500
        });

        // this.getProfile();
      }

    })
    // console.log(this.adform)
    // this.fms.saveaddress(this.adform).subscribe(res => {
    //   this.address = res;
    //   console.log(this.address)
    // })
  }


  editBread(id: number, templateRef: any) {
    console.log(id)
    this.breeddialogRef = this.dialog.open(templateRef, {
      width: '300px'
    });
  }


  onImageFileSelect(e: any) {
    this.message = [];
    this.progressInfos = [];
    const selectedFiles = e.target.files;

    if (selectedFiles && selectedFiles[0]) {
      this.profilePic = selectedFiles[0];
      //reader.readAsDataURL(selectedFiles[0]);

    }

  }
  onSubmitad() {


    console.log(this.adform)
    this.fms.saveAddress(this.adform).subscribe(res => {
      this.address = res;
      console.log(this.address)
    })






  }



  public listItemskey: Array<{ text: string; value: number; name: string }> = [
    { text: "Please select", value: 0, name: "select" },
    { text: "Home", value: 2175, name: "Home" },
    { text: "Office", value: 2176, name: "Office" },
  ];
}

