import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FmsService } from 'src/app/services/fms.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cartitems',
  templateUrl: './cartitems.component.html',
  styleUrls: ['./cartitems.component.scss'],
})
export class CartitemsComponent implements OnInit {
  cartLst: any =[];
  productPicUrl = environment.ProductUrl;
  userId: any=0;
  constructor(private fms: FmsService, private route: Router, public as: AuthService,) {}

  ngOnInit(): void {
    this.userId = this.as.getToken();
    this.getCartList();
  }
  getCartList() {
    if(!this.userId){
      this.cartLst = JSON.parse(localStorage.getItem('localCartLst') || '{}');
      console.log(this.cartLst)
      // this.fms.cartList().subscribe((res) => {
      //   console.log(res);
      //   this.cartLst = res;
      // });
    }else{
      this.fms.cartList().subscribe((res) => {
        console.log(res);
        this.cartLst = res;
      });
    }
   
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
    this.route.navigate(['/payment']);
  }
}
