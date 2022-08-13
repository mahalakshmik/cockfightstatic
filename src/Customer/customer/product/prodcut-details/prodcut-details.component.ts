import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FmsService } from 'src/app/services/fms.service';
import { LoginService } from 'src/app/services/login.service';
import { LoginComponent } from 'src/commonFiles/login/login.component';
import { MessageHeader } from 'src/commonFiles/profile/profile.modal';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import * as lookupStatic from 'src/assets/lookuplist.json';
import { Lookup } from './lookuplist.model';
//to import json i added 2 lines code in tsconfig.json (compilerOptions)(line:21,22)
declare var FB: any;
@Component({
  selector: 'app-prodcut-details',
  templateUrl: './prodcut-details.component.html',
  styleUrls: ['./prodcut-details.component.scss'],
})
export class ProdcutDetailsComponent implements OnInit {
  form: any = new MessageHeader();
  matDialogRef!: MatDialogRef<LoginComponent>;
  product: any;
  userdetails: any;
  productID: string | null;
  productPicUrl = environment.ProductUrl;
  images: any;
  fst: any;
  current: number = 0;
  imgList: { name: string }[];
  prdId: any;
  sellerID: any;
  userid: any;
  breeddialogRef: any;
  members: any;
  message: any;
  selectedFiles: any;
  constructor(
    private fms: FmsService,
    private ls: LoginService,
    private route: Router,
    private router: ActivatedRoute,
    public as: AuthService,
    private matDialog: MatDialog
  ) {
    this.userdetails = JSON.parse(localStorage.getItem('user') || '{}');
    this.productID = this.router.snapshot.paramMap.get('productID');
    this.sellerID = this.router.snapshot.paramMap.get('sellerID');
    localStorage.setItem('productID', JSON.stringify(this.productID));
    this.imgList = [
      { name: 'assets/images/consult/c1.jpg' },
      { name: 'assets/images/consult/c2.jpg' },
      { name: 'assets/images/consult/c3.jpg' },
      { name: 'assets/images/consult/c4.jpg' },
    ];
  }

  ngOnInit(): void {
    this.userid = this.as.getToken();
    this.getComments();
    this.productList();
    this.getImages();
    this.getMember();
    setInterval(() => {
      this.current = ++this.current % this.images.length;
    }, 1000);
  }
  getMember() {
    this.ls.memberListbyId(this.sellerID).subscribe((res) => {
      console.log('member' + res);
      this.members = res;
      localStorage.setItem('sellerName', JSON.stringify(this.members));
    });
  }
  getBreadType() {
    this.ls.breadLookup().subscribe((res: any) => {
      console.log(res);
      if (this.product.breedType != null) {
        let data = res.filter((i: any) => i.lookupId == this.product.breedType);
        this.product.breedType = data[0].lookupDescription;
      }
    });
  }
  getPaymentType() {
    this.ls.paymentTypeLookup().subscribe((res: any) => {
      console.log(res);
      const data = res.filter(
        (i: any) => i.lookupId == this.product.paymentOption
      );
      this.product.paymentOption = data[0].lookupDescription;
    });
  }
  getgender() {
    this.ls.genderLookup().subscribe((res: any) => {
      console.log(res);
      let genderdata = [];
      genderdata = res.filter((i: any) => i.lookupId == this.product.gender);
      this.product.gender = genderdata[0].lookupDescription;
    });
  }
  productList() {
    this.fms.produtListById(this.productID).subscribe((data) => {
      this.product = data;
      //  this.product.isGuest = false;

      console.log(data);
      this.prdId = this.product.productId;
      console.log('prdID', this.prdId);
      localStorage.setItem('selectedProdut', JSON.stringify(this.product));
      this.getgender();
      this.getBreadType();
      this.getPaymentType();
    });
  }

  getImages() {
    this.fms.getProductImages(this.productID).subscribe((res) => {
      console.log(res);
      this.images = res;
      console.log(this.images[0].imageName);
      localStorage.setItem('images', JSON.stringify(this.images[0].imageName));
      //this.fst = this.images[0].imageName;
      //console.log('st', this.fst)
    });
    this.productPicUrl.concat();
  }
  addCart() {
    if (!this.as.isLoggedIn()) {
      this.Login();
    } else {
      var payload = {
        cartID: 0,
        productID: this.product.productId,
        sellerID: this.product.sellerId,
        memberID: this.userdetails.userId,
        quantity: 1,
        unitPrice: this.product.standardPrice,
        currency: this.product.currency,
        discountAmount: this.product.discount,
        discountType: 0,
        totalAmount: 65,
        isGuest: false,
        stockQty: this.product.stockQty,
        // "IsGuest":false
      };
      console.log(payload);
      //this.route.navigate(['Cartitems'])
      this.fms.saveCartList(payload).subscribe((res) => {
        console.log(res);
        if (res) {
          Swal.fire({
            icon: 'success',
            title: 'Added to cart!',
            text: 'You clicked the button!',
            // type: "success",
            timer: 500,
          });
        }
      });
    }
  }
  swalalert() {
    Swal.fire({
      title: 'Added to CartList',
      icon: 'success',
      timer: 500,
    });
  }
  byNow() {
    if (!this.as.isLoggedIn()) {
      this.Login();
    } else {
      this.route.navigate(['Addressdelivery']);
    }
  }

  Login() {
    this.matDialogRef = this.matDialog.open(LoginComponent, {
      // data: { name: this.name },
      disableClose: true,
      width: '400px',
      height: '550px',
    });

    this.matDialogRef.afterClosed().subscribe((res) => {
      if (res == true) {
        // this.name = "";
      }
    });
  }
  SendMessageToSeller() {
    debugger;
    //before send message check login
    // alert(this.userdetails.userid)
    // const userid= this.as.getToken();
    if (!this.userid) {
      this.Login();
    } else {
      // console.log(this.form)
    }
  }
  getComments() {
    this.fms.getpostcomment(this.productID).subscribe((res) => {
      console.log(res);
      this.message = res;
    });
  }
  dialogbox(templateRef: any) {
    if (!this.userid) {
      this.Login();
    }
    this.breeddialogRef = this.matDialog.open(templateRef, {
      width: '300px',
    });
  }
  postComment() {
    //before send message check login
    //alert(this.userdetails.userid)
    if (!this.userid) {
      this.Login();
    } else {
      if (this.form) {
        this.form.comment = this.form.messageSubject;
        this.form.productId = this.productID;
        this.form.senderId = this.userid;
        this.form.receiverId = this.sellerID;

        console.log(this.form);
        this.fms.postcomment(this.form).subscribe((res) => {
          console.log(res);
          this.getComments();
          //this.ngOnInit();
        });
      }
    }
  }

  facebookUI(e: any) {
    var url = encodeURIComponent(window.location.href);

    var fbpopup = window.open(
      'https://www.facebook.com/sharer/sharer.php?u=' + url,
      'pop',
      'width=600, height=400, scrollbars=no'
    );
  }
  onFileSelect(event: any) {
    // this.message = [];
    // this.progressInfos = [];
    this.selectedFiles = event.target.files;
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFiles);
    console.log(this.selectedFiles);
    // this.previews = [];
    // if (this.selectedFiles && this.selectedFiles[0]) {
    //   const numberOfFiles = this.selectedFiles.length;
    //   for (let i = 0; i < numberOfFiles; i++) {
    //     const reader = new FileReader();

    //     reader.onload = (e: any) => {
    //       this.previews.push(e.target.result);
    //       console.log(this.previews);
    //     };

    //     reader.readAsDataURL(this.selectedFiles[i]);
    //   }
    // }
  }


  uploadFile(event:any) {
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    reader.readAsDataURL(file);
    console.log(file)
    // if (event.target.files && event.target.files[0]) {
    //   reader.readAsDataURL(file);

    //   // When file uploads set it to file formcontrol
    //   reader.onload = () => {
    //     this.imageUrl = reader.result;
    //     this.registrationForm.patchValue({
    //       file: reader.result
    //     });
    //     this.editFile = false;
    //     this.removeUpload = true;
    //   }
    //   // ChangeDetectorRef since file is loading outside the zone
    //   this.cd.markForCheck();        
    // }
  }
}
