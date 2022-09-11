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
import { NgxSpinnerService } from 'ngx-spinner';
//to import json i added 2 lines code in tsconfig.json (compilerOptions)(line:21,22)
declare var FB: any;
@Component({
  selector: 'app-prodcut-details',
  templateUrl: './prodcut-details.component.html',
  styleUrls: ['./prodcut-details.component.scss'],
})
export class ProdcutDetailsComponent implements OnInit {
  isEditing:boolean=false;
  newimageObject:any=[];
  imageObject = [
    {
      video: 'https://lgistorage.blob.core.windows.net/fmsvideos/21207_0.mp4',
      alt: 'No video',
      // title: 'video',
      thumbImage:''

    },
    {
      image: 'https://lgistorage.blob.core.windows.net/fmsimages/21207_1.jpeg',
      thumbImage:
        'https://lgistorage.blob.core.windows.net/fmsimages/21207_1.jpeg',
      // title: 'Images',
      alt:''
    },
  ];
  form: any = new MessageHeader();
  matDialogRef!: MatDialogRef<LoginComponent>;
  product: any;
  userdetails: any;
  productID: any;
  productPicUrl = environment.ProductUrl;
  productvideoUrl = environment.videoUrl;
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
  fileToUpload: any;
  imageUrl: any;
  messageId: any;
  model: any = {};
  uploadedFile: any;
  isHide: any;
  cartLst: any =[];
  comments:string='';
  videoname: any;
  smallvideo: any;
  isoutOfStock: any=false;
  constructor(
    private fms: FmsService,
    private ls: LoginService,
    private route: Router,
    private router: ActivatedRoute,
    public as: AuthService,
    private matDialog: MatDialog,
    public spinnerService: NgxSpinnerService
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
    this.spinnerService.show();
    this.productList();

    this.userid = this.as.getToken();
    this.getComments();
    // this.getImages();
    // this.getMember();
  
  }
 
  productList() {debugger
    this.fms.produtListById(this.productID,this.sellerID).subscribe((data: any) => {
      this.product = data.productMaster;
      //  this.product.isGuest = false;
      console.log(data);
      if(data.productVideo ){

        this.smallvideo=data.productVideo.imageName
      }
      this.prdId = this.product.productId;
      this.images=data.productImages;
      if(this.product.stockQty <=0){
        
        this.isoutOfStock=true;
      }
      this.members = data.member;
      
      console.log(this.images)
      localStorage.removeItem('images');
      localStorage.setItem('images', JSON.stringify(this.images[0].imageName));
      this.spinnerService.hide();
      localStorage.setItem('selectedProdutList', JSON.stringify(this.product));
      this.images.forEach((e:any) => {
       let imaglist={
        "thumbImage":this.productPicUrl+e.imageName,
        "image": this.productPicUrl+e.imageName
       }
     this.newimageObject.push(imaglist)
        
      });
      if(data.productVideo != null){
        const videourl=this.productvideoUrl+data.productVideo.imageName;
        this.newimageObject.push({'video':videourl})
      }
      console.log('checkthis',this.newimageObject)
      
   
   // localStorage.setItem('sellerName', JSON.stringify(this.members));
      //console.log('prdID', this.prdId);
      // localStorage.setItem('selectedProdut', JSON.stringify(this.product));
      // this.getgender();
      // this.getBreadType();
      // this.getPaymentType();
    });
  }


  addCart() {
    if (!this.as.isLoggedIn()) {
      console.log(localStorage.getItem('localCartLst') )

      if(localStorage.getItem('localCartLst')){
        const localdata = JSON.parse(localStorage.getItem('localCartLst') || '{}');
        this.cartLst.map(localdata)
        console.log(this.cartLst)
      }
    
      var payload1 = {
        CartId : 0,
        ProductId : this.product.productID,
        productName : this.product.productName,
        SellerId : this.product.sellerID,
        sellerName : this.product.sellerName,
        MemberId : 0,
        Quantity : 1,
        UnitPrice : this.product.standardPrice,
        Currency : this.product.currency,
        DiscountAmount : this.product.discount,
        DiscountType : 0,
        TotalAmount : 65,
        IsGuest : true,
        stockQty: this.product.stockQty,
        PaymentOptionDesc: this.product.paymentOptionDesc,
      };
      this.cartLst.push(payload1)

      localStorage.setItem('localCartLst', JSON.stringify(this.cartLst));
      console.log(payload1)
      console.log(this.cartLst)
      this.route.navigateByUrl('/Cartitems')
      // this.fms.saveCartList(payload1).subscribe((res: any) => {
      //   //console.log(res);
      //   if (res) {
      //     Swal.fire({
      //       icon: 'success',
      //       title: 'Added to cart!',
      //       text: 'You clicked the button!',
      //       // type: "success",
      //       timer: 500,
      //     });
      //   }
      // });
    } else {
      var payload = {
        CartId : 0,
        ProductId : this.product.productID,
        SellerId : this.product.sellerID,
        MemberId : this.userdetails.userId,
        Quantity : 1,
        UnitPrice : this.product.standardPrice,
        Currency : this.product.currency,
        DiscountAmount : this.product.discount,
        DiscountType : 0,
        TotalAmount : 65,
        IsGuest : false,
        stockQty: this.product.stockQty,
        PaymentOptionDesc: this.product.paymentOptionDesc,
        // "IsGuest":false
      };
      //console.log(payload);
      //this.route.navigate(['Cartitems'])
      this.fms.saveCartList(payload).subscribe((res: any) => {
        //console.log(res);
        if (res) {
          Swal.fire({
            icon: 'success',
            title: 'Added to cart!',
            text: 'You clicked the button!',
            // type: "success",
            timer: 500,
          });
          this.route.navigateByUrl('/Cartitems')
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
    localStorage.setItem('isCart','false')

    if (!this.as.isLoggedIn()) {
      this.Login();
    } else {
      localStorage.removeItem('selectedProdut');
     localStorage.setItem('selectedProdut', JSON.stringify(this.product));
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

    this.matDialogRef.afterClosed().subscribe((res: any) => {
      if (res == true) {
        // this.name = "";
      }
    });
  }
  SendMessageToSeller() {
    ;
    //before send message check login
    // alert(this.userdetails.userid)
    // const userid= this.as.getToken();
    if (!this.userid) {
      this.Login();
    } else {
      if (this.form.fileName == "")
      {
        this.form.fileName= "nofile";
      }
      var formdata = new FormData();
      formdata.append('messageId', '0');
      formdata.append('senderId', this.userid);
      formdata.append('receiverId', this.sellerID);
      formdata.append('productId', this.productID);
      formdata.append('createdOn', '2022-08-16T06:38:00.037Z');
      formdata.append('fileName', this.form.fileName);
      formdata.append('messageSubject', this.form.messageSubject);
    // withour filename also updating the savecomments use name 'nofile' to validte
      this.fms.sendMessageToseller(formdata).subscribe((res:any) => {
        console.log(res);
       // this.isHide = res.success
        if (res) {
          this.breeddialogRef.close();
          Swal.fire({
            icon: 'success',
            title: 'Message Sent',
            text: 'Message To Seller Successfully',
            // type: "success",
            timer: 500,
          });
          var comentspayload = {
            itemId: 0,
            messageId: res,
            memberId: this.userid,
            messageTo: this.sellerID,
            comment: this.comments,
            createdOn: '2022-08-16T06:38:00.037Z',
            isRead: true,
          };
          this.sendMessage(comentspayload);

        }
      });
      // //console.log(this.form)
    }
  }
  getComments() {
    this.fms.getpostcomment(this.productID).subscribe((res: any) => {
      //console.log(res);
      this.message = res;
    });
  }
  dialogbox(breedtemplate: any) {
    if (!this.userid) {
      this.Login();
    } else {
      this.breeddialogRef = this.matDialog.open(breedtemplate, {
        width: '300px',
        disableClose: true,
      });

      // this.breeddialogRef.afterClosed().subscribe((res: any) => {
      //   if (res == true) {
      //     // this.name = "";
      //   }
      // });
    }
  }
  postComment() {debugger
    //before send message check login
    this.spinnerService.show();

    if (!this.userid) {
    this.spinnerService.hide();

      this.Login();
    } else {
      if (this.form) {
        this.form.comment = this.form.messageSubject;
        this.form.productId = this.productID;
        this.form.senderId = this.userid;
        this.form.receiverId = this.sellerID;

        //console.log(this.form);
        this.fms.postcomment(this.form).subscribe((res: any) => {
          //console.log(res);
          this.messageId = res;
          if (res) {
            // this.form.messageId = res
            var payload = {
              itemId: 0,
              messageId: res,
              memberId: this.userid,
              messageTo: this.sellerID,
              comment: this.form.comment,
              createdOn: '2022-08-16T06:38:00.037Z',
              isRead: true,
            };
            this.sendMessage(payload);
            //});
          }
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
    //console.log(this.selectedFiles);
    // this.previews = [];
    // if (this.selectedFiles && this.selectedFiles[0]) {
    //   const numberOfFiles = this.selectedFiles.length;
    //   for (let i = 0; i < numberOfFiles; i++) {
    //     const reader = new FileReader();

    //     reader.onload = (e: any) => {
    //       this.previews.push(e.target.result);
    //       //console.log(this.previews);
    //     };

    //     reader.readAsDataURL(this.selectedFiles[i]);
    //   }
    // }
  }
  // sendMessageToseller

  uploadFile(event: any) {
    let reader = new FileReader();
    reader.onload = function () {
      let output: any = document.getElementById('blah');
      output.src = reader.result;
    };
    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]);

      this.selectedFiles = event.target.files[0];
      this.uploadedFile = event.target.files[0];
    }
   
  }
  sendreply(){
    this.postComment();
  }

  sendMessage(payload:any){
    this.spinnerService.show();

    this.fms.postCommnets(payload).subscribe((data: any) => {
      this.spinnerService.hide();
      this.form.messageSubject='';

      //console.log(data);
      if(data){
        this.getComments();

      }
    });
  }
  replyClick() {
    this.isEditing = !this.isEditing;
  }
  //#oldcode 
  
  getMember() {
    this.ls.memberListbyId(this.sellerID).subscribe((res: any) => {
      //console.log('member' + res);
      this.members = res;
      localStorage.setItem('sellerName', JSON.stringify(this.members));
    });
  }
  getBreadType() {
    this.ls.breadLookup().subscribe((res: any) => {
      //console.log(res);
      if (this.product.breedType != null) {
        let data = res.filter((i: any) => i.lookupId == this.product.breedType);
        this.product.breedType = data[0].lookupDescription;
      }
    });
  }
  getPaymentType() {
    this.ls.paymentTypeLookup().subscribe((res: any) => {
      //console.log(res);
      const data = res.filter(
        (i: any) => i.lookupId == this.product.paymentOption
      );
      this.product.paymentOption = data[0].lookupDescription;
    });
  }
  getgender() {
    this.ls.genderLookup().subscribe((res: any) => {
      //console.log(res);
      let genderdata = [];
      genderdata = res.filter((i: any) => i.lookupId == this.product.gender);
      this.product.gender = genderdata[0].lookupDescription;
    });
  }
  getImages() {
    this.fms.getProductImages(this.productID).subscribe((res: any) => {
      //console.log(res);
      this.images = res;
     // //console.log(this.images[0].imageName);
      localStorage.removeItem('images');
      localStorage.setItem('images', JSON.stringify(this.images[0].imageName));
      //this.fst = this.images[0].imageName;
      ////console.log('st', this.fst)
    });
    this.productPicUrl.concat();
  }
//#endoldcode
}
