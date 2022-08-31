import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FmsService } from 'src/app/services/fms.service';
import { LoginComponent } from 'src/commonFiles/login/login.component';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cartitems',
  templateUrl: './cartitems.component.html',
  styleUrls: ['./cartitems.component.scss'],
})
export class CartitemsComponent implements OnInit {
  cartLst: any = [];
  productPicUrl = environment.ProductUrl;
  userId: any = 0;
  matDialogRef!: MatDialogRef<LoginComponent>;
  test: any;
  isOnline: boolean = false;
  COD: boolean = false;

  constructor(private fms: FmsService, private matDialog: MatDialog, private route: Router, public as: AuthService,) { }

  ngOnInit(): void {
    this.userId = this.as.getToken();
    this.getCartList();
  }
  getCartList() {
    if (!this.userId) {
      this.cartLst = JSON.parse(localStorage.getItem('localCartLst') || '{}');
      console.log(this.cartLst)
      // this.fms.cartList().subscribe((res) => {
      //   console.log(res);
      //   this.cartLst = res;
      // });
    } else {
      this.fms.cartList().subscribe((res) => {
        console.log(res);
        this.cartLst = res;
        this.forEach()
      });

    }

  }
  forEach() {
    debugger
    this.cartLst.forEach((data: any) => {
      if (data.paymentOptionDesc == 'ONLINE') {
        ////alert('aasas') ;
        this.isOnline = true;
      } else if (data.paymentOptionDesc == 'CASH ON DELIVERY') {
        //  alert('COD')
        this.COD = true;
      }
      // this.test = data.paymentOptionDesc
      console.log(this.test)
    });
  }
  delete(cartID: number) {
    Swal.fire({
      title: 'Are you sure you want to delete the record?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, go ahead.',
      cancelButtonText: 'No, let me think',
    }).then((result) => {
      if (result.value) {
        this.deleteCart(cartID);
      }
    });
  }
  deleteCart(cartID: number) {
    this.fms.deleteCartList(cartID).subscribe((res) => {
      console.log(res);
      if (res) {
        // this.alert();
        this.getCartList();
      }
    });
  }

  alert() {
    Swal.fire({
      title: 'Deleted Successfully',
      icon: 'success',
      timer: 300,
    });
  }
  proceedToPayment() {
    debugger
    //it will not work without login
    //need to check iscart save for now localstorage

    localStorage.setItem('CartOrder', JSON.stringify(this.cartLst))
    localStorage.setItem('isCart', 'true')
    if (!this.as.isLoggedIn()) {
      this.Login();

    } else {
      if(this.isOnline && this.COD){
        alert('Order can not accept multiple payment types')
      }else{
        this.route.navigate(['/Addressdelivery']);
      }

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
        this.getCartList();
      }
    });
  }
}
