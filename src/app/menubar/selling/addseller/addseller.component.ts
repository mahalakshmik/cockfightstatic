import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FmsService } from 'src/app/services/fms.service';
import { LoginService } from 'src/app/services/login.service';
import { AzureBlobStorageService } from 'src/azure-blob-storage.service';
import { AddaddressComponent } from 'src/commonFiles/addAddress/addaddress/addaddress.component';
import { ProductMaster } from 'src/commonFiles/profile/profile.modal';
import { Address, Member } from 'src/commonFiles/register/register.model';
import Swal from 'sweetalert2';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { timingSafeEqual } from 'crypto';
@Component({
  selector: 'app-addseller',
  templateUrl: './addseller.component.html',
  styleUrls: ['./addseller.component.scss']
})
export class AddsellerComponent implements OnInit {


  // newone
  pid: any = 0;

  // newone
  separatorKeysCodes: number[] = [ENTER, COMMA];
  videoFile: any = [];

  productPicUrl = environment.ProductUrl;
  productVideoUrl = environment.videoUrl;

  isShowAddseller: boolean = false;
  myDir: any = 'profile';
  address: any;
  format: any;
  url: any;
  formsell: any = new ProductMaster();
  forms: any = new Member();
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
  vedio: boolean = true;
  previews: any[] = [];
  videoList: any;
  breeds: any = [];
  breadval: any;
  isbread: boolean = true;
  userdetails: any;
  test1: any;
  result: any;
  isvideo: boolean = false;
  edit: boolean = false;
  editimages: boolean = false;
  editvideos: boolean = false;
  count: number = 0;
  constructor(
    private fms: FmsService,
    private blobService: AzureBlobStorageService,
    private gs: LoginService,
    public dataservice: AuthService,
    private dialog: MatDialog,
    public router: Router,
    public spinnerService: NgxSpinnerService,
    private route: ActivatedRoute,

  ) {
    this.adform = new Address();
    console.log(this.adform);
    this.userdetails = JSON.parse(localStorage.getItem('user') || '{}');
    this.pid = this.route.snapshot.paramMap.get('id');
  }


  ngOnInit() {
    if (this.pid != 0) {
      this.spinnerService.show();
      this.formsell.productImage = this.pid.concat("_0.jpeg")
      this.getProductbyId();
    }
    this.getAddressList();
    this.getOrderHistory();
    this.getCurrenyList();
    this.getGender();
    this.getAgeList();
    this.getBreadType();
    this.getPaymentTypeList();
    this.getWeight();
    // this.getvideoList();
    this.vedio = true;

    this.formsell.gender = '';
    this.formsell.breedType = '';
    this.formsell.ageType = '2131';
    this.formsell.breed = '';
    this.formsell.uom = '2151';
    this.formsell.stockQty = 1;
    this.formsell.currency = 'THB';
    this.formsell.paymentOption = '2177';

    this.forms.memberType = 0;
  }
  getProductbyId() {
    const farmid = 2165
    this.fms.produtListById(this.pid, farmid).subscribe((res: any) => {
      console.log(res)
      this.formsell = res.productMaster;
      this.spinnerService.hide();
      this.getImgListByProductId(this.pid);
this.formsell.productImage = this.pid.concat("_0.jpeg")
    })
  }
  showtemp() {
    this.isShowAddseller = true;
  }
  editseller(sellerList: any) {
    this.edit = true;
    this.isShowAddseller = true;
    this.previews = []

    this.formsell = sellerList;
    // this.formsell.myfile=sellerList.productImage;

    console.log('edit', sellerList);
    console.log(this.url)


    this.getImgListByProductId(sellerList.productID);
  }
  getImgListByProductId(id: number) {debugger
    this.fms.getimgListbyProductId(id).subscribe((res: any) => {
      if (res.length > 0) {
        res.forEach((e: any) => {
          debugger
          const imgs = this.productPicUrl + e.imageName;
          if (e.contentType == "video/mp4") {
            this.isvideo = true;
            this.url = '';
            this.url = this.productVideoUrl + e.imageName;

          } else {

            this.previews.push(imgs)

          }
        });
      }
    })
  }


 

  createsell() {
    
    this.uploadFiles.push(...this.previews)

    this.spinnerService.show();
    if (this.formsell.discount == undefined) {
      this.formsell.discount = 0;
    }
    if (this.formsell.weight == undefined) {
      this.formsell.weight = 0;
    }
    // if (!this.editvideos && this.edit) {
    //   this.videoFile = []
    // }
    // if (!this.editimages && this.edit) {
    //   this.uploadFiles = []
    // }
    console.log(this.formsell);
    var formdata = new FormData();
    formdata.append('ProductId', this.formsell.productID);
    formdata.append('ProductCode', this.formsell.productCode);
    formdata.append('ProductName', this.formsell.productName);
    formdata.append('ProductType', '2165');
    formdata.append('Gender', this.formsell.gender);
    formdata.append('BreedType', this.formsell.breedType);
    formdata.append('SellerId', this.userdetails.userId);
    formdata.append('Talents', this.formsell.talents);
    formdata.append('FightingRecord', this.formsell.fightingRecord);
    formdata.append('ProductBrand', 'NULL');
    formdata.append('DateOfBirth', '1964-12-16T01:00:34.149Z');
    formdata.append('Uom', this.formsell.uom);
    formdata.append('Weight', this.formsell.weight);
    formdata.append('StandardPrice', this.formsell.standardPrice);
    formdata.append('Discount', this.formsell.discount);
    formdata.append('Currency', this.formsell.currency);
    formdata.append('PaymentOption', this.formsell.paymentOption);
    formdata.append('ProductImage', this.formsell.productImage);
    formdata.append('Remarks', 'test');
    formdata.append('IsActive', 'true');
    formdata.append('IsAvailable', 'true');
    formdata.append('StockQty', this.formsell.stockQty);
    formdata.append('CreatedOn', '1944-05-31T06:21:21.373Z');
    formdata.append('ModifiedOn', '1974-05-13T00:14:37.989Z');
    formdata.append('Age', this.formsell.age);
    formdata.append('Breed', this.formsell.breed);
    formdata.append('Province', this.formsell.province);
    formdata.append('AgeType', this.formsell.ageType);
    for (var i = 0; i < this.uploadFiles.length; i++) {
      formdata.append('uploadProductImages', this.uploadFiles[i]);
    }
    for (var i = 0; i < this.videoFile.length; i++) {
      formdata.append('productVideos', this.videoFile[i]);
    }



    this.fms.saveSeller(formdata).subscribe((res) => {
      this.spinnerService.hide();
      if (res) {
        Swal.fire({
          title: 'Saved Successfully',
          icon: 'success',
          timer: 700,
        });

        if(this.formsell.productID ==0){

          this.fms.saveImagename(res).subscribe(resp => {
            console.log(resp)
            if (resp) {
  
              this.router.navigate(['menu/readytosell']);
  
            }
          })
        }
        this.router.navigateByUrl('/menu/readytosell')
      }
      // this.isShowAddseller = false;
    });
  
   
  }


  test(i: number) {
    this.previews.splice(i, 1);
  }
  onSubmit() {
    console.log(this.forms);
    this.gs.userRegister(this.forms).subscribe((res) => {
      console.log(res);
    });
    // console.log(this.adform)
    // this.fms.saveaddress(this.adform).subscribe(res => {
    //   this.address = res;
    //   console.log(this.address)
    // })
  }


  onFileSelect(event: any) {
    
    //  this.count++
    //     if (this.pid != 0 && this.count ==1) {
    //       this.previews = [];
    //       this.edit = false;
    //       this.editimages = true;
    //     }
    
    this.message = [];
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
    for (let i = 0; i < event.target.files.length; i++) {
      this.uploadFiles.push(event.target.files[i]);
      
    }
    console.log(this.uploadFiles)
    // this.previews = [];
    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          this.previews.push(e.target.result);
          // this.uploadFiles.push(event.target.files[i]);

          console.log(this.uploadFiles)
        };
        reader.readAsDataURL(this.selectedFiles[i]);
      }
    }
  }

  onSelectFile(event: any) {
    debugger;
    if (this.edit) {
      this.editvideos = true;
    }
    const file = event.target.files && event.target.files[0];
    if (file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      if (file.type.indexOf('image') > -1) {
        this.format = 'image';
      } else if (file.type.indexOf('video') > -1) {
        this.format = 'video';
      }
      reader.onload = (event) => {
        this.url = (<FileReader>event.target).result;
        this.isvideo = true;
      };
    //  this.videoFile = file;
      for (let i = 0; i < event.target.files.length; i++) {
        this.videoFile.push(event.target.files[i]);
        
      }
    }
  }

  reloadVideos() {
    this.blobService.listVideos;
  }

  public listItemskey: Array<{ text: string; value: number; name: string }> = [
    { text: 'Please select', value: 0, name: 'select' },
    { text: 'Home', value: 2175, name: 'Home' },
    { text: 'Office', value: 2176, name: 'Office' },
  ];
  public listItemskeys: Array<{ text: string; value: number }> = [
    { text: 'Please Select', value: 0 },
    { text: 'Farm', value: 2171 },
    { text: 'Transport', value: 2172 },
    { text: 'Shop', value: 2173 },
  ];
  // @ViewChild('fruitInput') fruitInput: ElementRef<any>;
  ////test 
  getAddressList() {
    // alert('')
    this.fms.addressList().subscribe((res) => {
      this.addresslist = res;
      console.log(this.addresslist);
    });
  }
  getCurrenyList() {
    this.fms.getSellCurrencyDropList().subscribe((res) => {
      console.log(res);
      this.currencyList = res;
    });
  }
  getGender() {
    this.fms.getSellGenderDropList().subscribe((res) => {
      console.log(res);
      this.genderList = res;
    });
  }
  getWeight() {
    this.fms.getSellWeightDropList().subscribe((res) => {
      console.log(res);
      this.weightList = res;
    });
  }
  getBreadType() {
    this.fms.getSellBreedTypeDropList().subscribe((ress) => {
      this.breedList = ress;
    });
  }
  getOrderHistory() {
    this.fms.getOrderHistory().subscribe((res) => {
      console.log(res);
      this.orderHistory = res;
    });
  }
  getbread() {
    this.fms.getSellingBreed().subscribe((ress) => {
      this.breeds = ress;
    });
  }
  getAgeList() {
    this.fms.getSellAgeDropList().subscribe((ress) => {
      this.ageList = ress;
    });
  }
  getPaymentTypeList() {
    this.fms.getSellPaymentTypeDropList().subscribe((ress) => {
      this.paymentList = ress;
    });
  }


  private removeFirst<T>(array: T[], toRemove: T): void {
    const index = array.indexOf(toRemove);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }
  change(event: any, p: any) {
    debugger
    if (event.isUserInput) {
      console.log(event.source.value, event.source.selected);
      this.test1 = p.breedName

      //alert(this.test1)
      for (let i = p.breedName; i <= p.breedName; i++) {
        this.test1 = i
        this.result = []
        this.result.push(this.test1)
        console.log(this.test1);
      }
    }
  }
}
