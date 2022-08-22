import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FmsService } from 'src/app/services/fms.service';
import {
  Notificationvm,
  OrderSave,
} from 'src/commonFiles/payment/ordersave.model';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ordersummary',
  templateUrl: './ordersummary.component.html',
  styleUrls: ['./ordersummary.component.scss'],
})
export class OrdersummaryComponent implements OnInit {
  selectedProdut: any;
  productCount: number = 1;
  totalAmount: any;
  disable: boolean = false;
  notification = new Notificationvm();
  productID: any;
  productPicUrl = environment.ProductUrl;
  images: any;
  sellerName: any;
  forms: any = new OrderSave();
  totalamount: any;
  orderID: any;
  userdetails: any;
  errormessage: string = '';

  constructor(private route: Router, private fms: FmsService) {
    this.selectedProdut = JSON.parse(
      localStorage.getItem('selectedProdut') || '{}'
    );
    this.productID = JSON.parse(localStorage.getItem('productID') || '{}');
    this.images = JSON.parse(localStorage.getItem('images') || '{}');
    this.sellerName = JSON.parse(localStorage.getItem('sellerName') || '{}');
    this.userdetails = JSON.parse(localStorage.getItem('user') || '{}');
    console.log(this.selectedProdut);
    console.log(this.productID);
  }

  ngOnInit(): void {
    this.totalAmount = this.selectedProdut.standardPrice;
    //this.selectedProdut.discount;
    this.totalAmount = this.totalAmount - this.selectedProdut.discount;
  }

  increment() {
    // this.productCount = this.productCount++
    if (this.selectedProdut.stockQty == this.productCount) {
      this.errormessage = `We are sorry! Only ${this.selectedProdut.stockQty} item(s) are available`;
    } else {
      this.errormessage = '';
      this.productCount++;
      if (this.productCount == 2) {
        this.disable = false;
      }
      this.totalAmount = this.selectedProdut.standardPrice * this.productCount;
      this.totalAmount = this.totalAmount - this.selectedProdut.discount;
    }
  }

  confirmOrder() {
    localStorage.setItem('quantity',JSON.stringify(this.productCount))
    if (this.selectedProdut.paymentOption == 2177) {
      this.confirmOrderforCOD();
      //this.saveNotificaton()
    } else {
      this.route.navigate(['payment']);
      localStorage.setItem('totalamount', JSON.stringify(this.totalAmount));
    }
  }
  saveNotificaton() {
    this.notification.senderId = this.selectedProdut.sellerId;
    this.notification.message =
      'New Order Received: Farm Praveen' +
      '(' +
      this.orderID +
      ') from' +
      this.userdetails.userName +
      'for product' +
      this.selectedProdut.productName;
    console.log(this.notification);
    this.fms.saveNotifications(this.notification).subscribe((res) => {
      console.log(res);
     
    });
  }
  confirmOrderforCOD() {
    console.log(this.forms);
    this.forms.orderAmount = this.selectedProdut.standardPrice;
    this.forms.discountAmount = this.selectedProdut.discount;
    this.forms.totalAmount = this.totalamount;
    this.fms.Payment(this.forms).subscribe((res) => {
      this.orderID = res;
      console.log(res);
      if (res) {
        ///this method called in confrom order payment
        // this.saveNotificaton()
        Swal.fire({
          icon: 'success',
          title: 'Order Confirmed!',
          text: 'You clicked the button!',
          // type: "success",
          timer: 500,
        });
        localStorage.setItem('orderID', JSON.stringify(this.orderID));
        this.route.navigate(['/customer/confirmorder']);
      }
    });
  }
  decrement() {
    this.errormessage = '';

    this.productCount--;
    if (this.productCount == 1) {
      this.disable = true;
    }
    this.totalAmount = this.selectedProdut.standardPrice * this.productCount;
    this.totalAmount = this.totalAmount - this.selectedProdut.discount;
  }
}
