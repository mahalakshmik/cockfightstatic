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
  productvideoUrl=environment.videoUrl;
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
  Login() {
    this.matDialogRefL = this.matDialog.open(LoginComponent, {
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
  addwish(p: any, index: any) {
    if (!this.userid) {
      this.Login()
      //alert('please login!');
    } else {
      console.log(p);
      p.select = !p.select;
      // p.forEach((element:any) => {
      //   console.log(element);
      //   icon:"fa fa-thumbs-o-up thum-icon"

      // });
      // console.log(this.product[0].productId)
      if (this.product) {
        for (let i = 0; i < this.product.length; i++) {
          this.prd = this.product[i];
        }
      }
      console.log(this.prd);
      localStorage.setItem('prodList', JSON.stringify(this.prd));
      // this.quantity = this.prd.stockQty
      // this.prd.push(this.quantity)
      this.fmss.saveWishList(p).subscribe((res) => {
        console.log(res);
        Swal.fire({
          icon: 'success',
          title: 'Added to wishList!',
          // text: "You clicked the button!",
          // type: "success",
          timer: 500,
        });
        this.ngOnInit();
      });
    }
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
    this.fmss.getStockList().subscribe((res) => {
      console.log(res);
      this.stocklst = res;
    });
  }
  productList() {
    this.spinnerService.show();
    this.fmss.productSearch(this.form).subscribe((res) => {
      console.log(res);
      this.product = res;
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
  

  openDialog(templateRef:any,pid:any) {debugger
    let dialogRef = this.matDialog.open(templateRef, {
     width: '300px',
     height: '500px',
     panelClass: 'mydialogclass'
   });
const url=this.productvideoUrl+pid
   this.videoname=url.concat('_0.mp4')
  }
}
