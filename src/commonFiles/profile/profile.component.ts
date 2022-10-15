import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FmsService } from 'src/app/services/fms.service';
import { LoginService } from 'src/app/services/login.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { AddaddressComponent } from '../addAddress/addaddress/addaddress.component';
import { Address, Member } from '../register/register.model';
import { ProductMaster } from './profile.modal';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
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
  //uploadForm: any;
  //uploadFile: any;
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
  selectedFiles3: any;
  selectedFiles2: any;
  selectedFiles1: any;
  breeddialogRef: any;
  constructor(private fms: FmsService, private gs: LoginService, private as: AuthService, private dialog: MatDialog, public router: Router) {
    this.adform = new Address;
    const userDetails = this.as.getLoggedUserDetails();
    this.userID = userDetails.userId;
    console.log('id', this.userID)

  }
  openDialog() {
    this.dialog.open(AddaddressComponent, {
      width: '800px',
      height: '700px',
      //data: rowdata
    });
  }
  edit(rowdata: any, i: number) {
    //console.log(rowdata)

    this.dialog.open(AddaddressComponent, {
      width: '800px',
      height: '700px',
      data: rowdata[i]
    });
  }
  ngOnInit(): void {


  }
  
  showtemp() {
    this.isShowAddseller = true;
  }
 
  public listItemskeys: Array<{ text: string; value: any; }> = [
    { text: "Please Select", value: null },
    { text: "Farm", value: 2171 },
    { text: "Transport", value: 2172 },
    { text: "Shop", value: 2173 },
  ];
  getProfile() {
    


    this.gs.memberListbyId(this.userID).subscribe(res => {
      console.log(res);

      this.forms = res;
    })
  }

  // onFileSelect(event: any) {

  //   this.message = [];
  //   this.progressInfos = [];
  //   this.selectedFiles = event.target.files;
  //   this.previews = [];
  //   if (this.selectedFiles && this.selectedFiles[0]) {
  //     const numberOfFiles = this.selectedFiles.length;
  //     for (let i = 0; i < numberOfFiles; i++) {
  //       this.uploadFiles.push(this.selectedFiles[i])
  //       const reader = new FileReader();
  //       console.log(this.uploadFiles)

  //       reader.onload = (e: any) => {
  //         this.previews.push(e.target.result);
  //         console.log(this.previews)
  //       };

  //       reader.readAsDataURL(this.selectedFiles[i]);
  //     }
  //   }
  // }


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
  getOrderHistory() {
    this.fms.getOrderHistory().subscribe(res => {
      console.log(res);
      this.orderHistory = res;
    })
  }
  getSellerList() {
    this.fms.getSellerList().subscribe(res => {
      console.log(res)
      this.sellerList = res;
      console.log('seller', this.sellerList.result)
    })
  }

  createsell() {
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
    this.fms.saveSeller(formdata).subscribe(res => { console.log(res) })

  }
  delete(rowdata: any, i: number) {
    Swal.fire({
      title: 'Are you sure you want to delete the record?',

      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, go ahead.',
      cancelButtonText: 'No, let me think'
    }).then((result) => {

      if (result.value) {
        //   this.fms.saveAddress(result.value).subscribe(res => {
        //     console.log(res)
        //     if (res) {
        //       this.ngOnInit();
        //     }
        //   }

        //  );

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',


        )
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

        this.getProfile();
      }

    })
    // console.log(this.adform)
    // this.fms.saveaddress(this.adform).subscribe(res => {
    //   this.address = res;
    //   console.log(this.address)
    // })
  }
  getBread() {
    this.fms.getBreeds().subscribe(res => {
      console.log('bread', res);
      this.breedLst = res
    })
  }
  deletebread(data: any, index: number) {
    this.alertConfirmation(data, index)
  }
  alertConfirmation(rowdata: any, index: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: ' you want to delete the Breed, this action cannot be undone',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, go ahead.',
      cancelButtonText: 'No, let me think'
    }).then((result) => {
      if (result.value) {
        
        this.breedLst.splice(index, 1);
      }
    })
  }
  editBread(id: number, templateRef: any) {
    console.log(id)
    this.breeddialogRef = this.dialog.open(templateRef, {
      width: '300px'
    });
  }

  getAddressList() {
    // alert('')
    this.fms.addressList().subscribe(res => {
      this.addresslist = res;
      console.log(this.addresslist)
    })
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
  ////////////verfiy upload  ////////
  onFileSelect(event: any, i: number) {

    this.message = [];
    this.progressInfos = [];
    if (i == 1) {

      this.selectedFiles1 = event.target.files;
    }
    if (i == 2) {

      this.selectedFiles2 = event.target.files;
    }
    if (i == 3) {

      this.selectedFiles3 = event.target.files;
    }
    console.log(this.selectedFiles1)
    this.previews = [];

    // if (this.selectedFiles && this.selectedFiles[0]) {
    //   const numberOfFiles = this.selectedFiles.length;
    //   for (let i = 0; i < numberOfFiles; i++) {
    //     const reader = new FileReader();

    //     reader.onload = (e: any) => {
    //       this.previews.push(e.target.result);
    //       console.log(this.previews)
    //     };

    //     reader.readAsDataURL(this.selectedFiles[i]);
    //   }
    // }
  }

  verifyUpload() {
    var formdata = new FormData();
    formdata.append("Document1", this.selectedFiles1[0]);
    formdata.append("Document2", this.selectedFiles2[0]);
    formdata.append("Document3", this.selectedFiles3[0]);
    formdata.append("MemberType", "123");
    formdata.append("UserID", this.userID);
    formdata.append("Isverified", "true");
    formdata.append("Document1FileName", "test1");
    formdata.append("Document2FileName", "test2");
    formdata.append("Document3FileName", "test3");
    //console.log(formdata)
    this.fms.verifyUpload(formdata).subscribe(res => {
      console.log(res);
      if (res) {
        Swal.fire({
          title: 'Documents Uploaded Successfully',
          icon: 'success',
          // text: ' you want to delete the Order, this action cannot be undone',
          // showCancelButton: true,
          // confirmButtonText: 'Yes, go ahead.',
          // cancelButtonText: 'No, let me think'
        })
      }
    })
    //Documents Uploaded Successfully
  }

  public listItemskey: Array<{ text: string; value: number; name: string }> = [
    { text: "Please select", value: 0, name: "select" },
    { text: "Home", value: 2175, name: "Home" },
    { text: "Office", value: 2176, name: "Office" },
  ];
}
