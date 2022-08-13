import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FmsService } from 'src/app/services/fms.service';
import { LoginService } from 'src/app/services/login.service';
import { AzureBlobStorageService } from 'src/azure-blob-storage.service';
import { AddaddressComponent } from 'src/commonFiles/addAddress/addaddress/addaddress.component';
import { ProductMaster } from 'src/commonFiles/profile/profile.modal';
import { Address, Member } from 'src/commonFiles/register/register.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ready-tosell-list',
  templateUrl: './ready-tosell-list.component.html',
  styleUrls: ['./ready-tosell-list.component.scss']
})
export class ReadyTosellListComponent implements OnInit {
  format: any;
  url:any;
  isShowAddseller:boolean=false;
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
  paymentList: any;
  weightList: any;
  sellerList: any;
  selectedFiles?: FileList;
  progressInfos: any[] = [];
  message: string[] = [];
  vedio:boolean =false;
  previews: string[] = [];
  videoFile: any;  sas = "sp=racwdl&st=2022-05-31T16:23:01Z&se=2023-02-01T00:23:01Z&spr=https&sv=2020-08-04&sr=c&sig=oW0QUJH7%2Fc4BbeTtD7cUYanyyQONWOPcQH0JdBTa8g0%3D";
  videosas="sp=racwdl&st=2022-05-31T16:40:31Z&se=2023-01-03T00:40:31Z&spr=https&sv=2020-08-04&sr=c&sig=GL2giHB4GndIybklT1P6tuIAvI7%2B%2BcUD9799sHnBVHQ%3D"
  videoList: any;
  
  constructor(private fms: FmsService, private gs: LoginService,private blobService: AzureBlobStorageService, private as: AuthService, private dialog: MatDialog, public router: Router) {
    this.adform = new Address;
    console.log(this.adform)
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
this.vedio=false;
//this.getvideoList();
    this.getSellerList();
   // this.getProfile();
    this.getAddressList();
    this.getOrderHistory();
    this.getCurrenyList();
    this.getGender();
    this.getAgeList();
    this.getBreadType();
    this.getPaymentTypeList();
    this.getWeight();
    this.formsell.gender = '';
    this.formsell.breedType = '';
    this.formsell.ageType = '';
    this.formsell.uom = '';
    this.formsell.currency = '';
    this.formsell.paymentOption = '';
    this.forms.memberType = 0;
  } simpleAlert() {
    Swal.fire('Hello Angular');
    //this.saveaddress()
  }
 
  showtemp(){
    this.isShowAddseller=true;
  }
  editseller(sellerList:any){
    this.isShowAddseller=true;
    //this.formsell.index=i;
   // data:rowdata;
    this.formsell = sellerList;
  //  console.log('edit',rowdata)
   console.log('edit',sellerList)

  }
  public listItemskeys: Array<{ text: string; value: number; }> = [
    { text: "Please Select", value: 0 },
    { text: "Farm", value: 2171 },
    { text: "Transport", value: 2172 },
    { text: "Shop", value: 2173 },
  ];
  // getProfile() {
  //   
  //   this.gs.memberListbyId(this.u).subscribe(res => {
  //     console.log(res);

  //     this.forms = res;
  //   })
  // }
  onFileSelect(event: any) {
    
    this.message = [];
    this.progressInfos = [];
    this.selectedFiles = event.target.files;

    this.previews = [];
    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();

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
  getBreadType(){
    this.fms.getSellBreedTypeDropList().subscribe(ress =>{console.log(ress);
    this.breedList = ress;})
  }
  getAgeList(){
    this.fms.getSellAgeDropList().subscribe(ress =>{console.log(ress);
    this.ageList = ress;})
  }
  getPaymentTypeList(){
    this.fms.getSellPaymentTypeDropList().subscribe(ress =>{console.log(ress);
    this.paymentList = ress;})
  }
  getOrderHistory() {
    this.fms.getOrderHistory().subscribe(res => {
      console.log(res);
      this.orderHistory = res;
    })
  }
  getSellerList(){
    this.fms.getSellerList().subscribe(res => {console.log(res)
    this.sellerList = res;
    console.log('seller' ,this.sellerList.result)
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
    this.fms.saveSeller(formdata).subscribe(res =>{console.log(res)})

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

  test(i:number){
    this.previews.splice(i,1);

  }
  onSubmit() {
    console.log(this.forms)
    this.gs.userRegister(this.forms).subscribe(res => { console.log(res) })
    // console.log(this.adform)
    // this.fms.saveaddress(this.adform).subscribe(res => {
    //   this.address = res;
    //   console.log(this.address)
    // })
  }
  getAddressList() {
    // alert('')
    this.fms.addressList().subscribe(res => {
      this.addresslist = res;
      console.log(this.addresslist)
    })
  }
  onSubmitad() {
    

    console.log(this.adform)
    this.fms.saveAddress(this.adform).subscribe(res => {
      this.address = res;
      console.log(this.address)
    })
  }


  onSelectFile(event:any) {debugger
    const file = event.target.files && event.target.files[0];
    if (file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      if(file.type.indexOf('image')> -1){
        this.format = 'image';
      } else if(file.type.indexOf('video')> -1){
        this.format = 'video';
      }
      reader.onload = (event) => {
        this.url = (<FileReader>event.target).result;
      }
    }
  }
  public videoSelected(e: any) {
  const file=  e.target.files[0]
    this.blobService.uploadVIDEOS(this.videosas, file, file.name, () => {
      this.reloadVideos()
    })
  }
  reloadVideos(){
    
  }
 

  public listItemskey: Array<{ text: string; value: number; name: string }> = [
    { text: "Please select", value: 0, name: "select" },
    { text: "Home", value: 2175, name: "Home" },
    { text: "Office", value: 2176, name: "Office" },
  ];
}
