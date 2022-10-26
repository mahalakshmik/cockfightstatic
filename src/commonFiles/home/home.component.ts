import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth.service';
import { FmsService } from 'src/app/services/fms.service';
import { LoginService } from 'src/app/services/login.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { productsearch } from './productsearch.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  matDialogRefL!: MatDialogRef<LoginComponent>;
  matDialogRef!: MatDialogRef<RegisterComponent>;
  form = new productsearch();
  product: any;
  productPicUrl = environment.azureblobImgUrl;
  prd: any;
  quantity: any;
  likeCount: any = null;
  stocklst: any;
  isWishicon: boolean = true;
  userid: any;
  videoname:string='21207';
  isIconUncheck='fa fa-thumbs-up thum-icon' ;
  isIconcheck='fa fa-thumbs-o-up thum-icon' ;
  productvideoUrl=environment.videoUrl;
  dialogRef: any;
  constructor(
    private matDialog: MatDialog,
    private fms: LoginService,
    public gs: AuthService,
    private fmss: FmsService,
    public spinnerService: NgxSpinnerService,
    private as: AuthService,
    private rout:Router,
  ) {}

  img_list = [
    'https://picsum.photos/600/400/?image=0',
    'https://picsum.photos/600/400/?image=1',
    'https://picsum.photos/600/400/?image=2',
  ];
  img = [
    { name: 'one' },
    { name: 'two' },
    { name: 'three' },
    { name: 'four' },
    { name: 'five' },
  ];
  //dynamic images added in style.css(1480 line)
  current = 0;
  ngOnInit(): void {
    this.userid = this.as.getToken();
    console.log(this.form);
    this.getStock();
    this.productList();
    //  this.form.productType=
    //this.lookupList();
    this.likeCount = 1;

    setInterval(() => {
      this.current = ++this.current % this.img_list.length;
    }, 2000);
    // this.spinnerService.hide();
  }
  onChange(e: any) {
    console.log(e.target.value);
  }
  lookupList() {
    this.fms.getLookUp().subscribe((res) => {
      console.log(res);
    });
    this.productPicUrl.concat();
  }
  Login(p:any) {
    const dialogReference  = this.matDialog.open(LoginComponent, {
      // data: { name: this.name },
      disableClose: true,
      width: '400px',
      height: '550px',
    });

    dialogReference.afterClosed().subscribe((res) => {
      if (res == true) {
        this.saveLike(p);

      }
    });
  }
  addwish(p: any, index: any) {
    this.userid = this.as.getToken();
    if (!this.userid) {
    this.Login(p);
    
  
    }else{
      this.saveLike(p)
  }
      //alert('please login!');
    // } else {
    //   console.log(p);
    //   this.saveLike(p)
      
    // }
  }
  saveLike(p: any){
    p.select = !p.select;
   
    if (this.product) {
      for (let i = 0; i < this.product.length; i++) {
        this.prd = this.product[i];
      }
    }
    console.log(this.prd);
    localStorage.setItem('prodList', JSON.stringify(this.prd));
  //if without login then check this
    
    this.fmss.saveWishList(p).subscribe((res) => {
      console.log(res);
      Swal.fire({
        icon: 'success',
        title: 'Added to wishList!',
        // text: "You clicked the button!",
        // type: "success",
        timer: 500,
      });
      this.productList();
    });
  }
  reset(form: any) {
    form.reset();
    this.form.priceFrom = '';
    this.form.priceTo = '';
    this.form.province = '';
    this.form.promotion = '';
    this.form.productName = '';
    this.form.productBrand = '';
    this.form.age = '';
    this.productList();
  }
  onSubmit() {
    console.log(this.form);
    this.productList();
  }
  getStock() {
    this.fmss.getStockList().subscribe(
      res => {
      console.log(res);
      this.stocklst = res;
    
   
    }
    
    
    );
  }
  productList() {
    this.spinnerService.show();
    this.fmss.productSearch(this.form).subscribe((res) => {
      this.product = res;
      const nostockdata=this.product.filter((x:any)=>x.stockQty <=  0 );
      const stockdata=this.product.filter((x:any)=>x.stockQty >  0 );
      console.log(stockdata);
      console.log(nostockdata);
      // here showing no stock data last --praveen
      this.product=stockdata.concat(nostockdata);
      this.spinnerService.hide();
    });
  }
  OpenModal() {
    this.matDialogRef = this.matDialog.open(RegisterComponent, {
      disableClose: true,
      width: '500px',
      height: '650px',
    });

    this.matDialogRef.afterClosed().subscribe((res) => {
      if (res == true) {
      }
    });
  }
  gotodetails(p:any){

  //localStorage.setItem('selectedProdutList', JSON.stringify(p));
    this.rout.navigate(['customer/ProdcutDetails/',p.productID, p.sellerID])

  }
  addfollowseller(sid:number){
    this.userid = this.as.getToken();
    this.spinnerService.show();
    if (!this.userid) {
      this.spinnerService.hide();
      const dialogReference  = this.matDialog.open(LoginComponent, {
        // data: { name: this.name },
        
        disableClose: true,
        width: '400px',
        height: '550px',
      });
      dialogReference.afterClosed().subscribe((res) => {
        console.log(res)
        if (res === true) {
    this.userid = this.as.getToken();

this.addfollow(sid,this.userid)

        }
      });
    }else{
this.addfollow(sid,this.userid)
    }
   
  }
addfollow(sid:number,uid:number){
const  fid=0;
  this.fmss.saveFollowers(sid,uid,fid).subscribe(
    res=>
    {
      this.spinnerService.hide();
      if(res){
        Swal.fire({
          icon: 'success',
          title: 'Following ',
          // text: "You clicked the button!",
          // type: "success",
          timer: 500,
        });
      }
    }
  )
}
  openDialog(templateRef:any,pid:any) {
   this.dialogRef = this.matDialog.open(templateRef, {
      width: "80vw",
        height: "90vh",
        maxWidth: "350px",
        maxHeight: "500px"
   });
const url=this.productvideoUrl+pid
   this.videoname=url.concat('_0.mp4')
  }
}
