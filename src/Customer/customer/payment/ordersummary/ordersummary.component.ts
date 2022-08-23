import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FmsService } from 'src/app/services/fms.service';
import {
  Notificationvm,
  OrderSave,
} from 'src/commonFiles/payment/ordersave.model';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { orderdetails, orderPayment, OrderVM } from '../orderVM.model';

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
  orderVM = new OrderVM();
  productID: any;
  productPicUrl = environment.ProductUrl;
  images: any;
  sellerName: any;
  forms: any = new OrderSave();
  totalamount: any;
  orderID: any;
  userdetails: any;
  errormessage: string = '';
  orderDetail: any;
  orderPayment: any;

  constructor(private route: Router, private fms: FmsService) {
    this.selectedProdut = JSON.parse(
      localStorage.getItem('selectedProdut') || '{}'
    );
    this.productID = JSON.parse(localStorage.getItem('productID') || '{}');
    this.images = JSON.parse(localStorage.getItem('images') || '{}');
    this.sellerName = JSON.parse(localStorage.getItem('sellerName') || '{}');
    this.userdetails = JSON.parse(localStorage.getItem('user') || '{}');
    this.orderVM = this.selectedProdut;
    this.orderVM.deliveryAddress = JSON.parse(
      localStorage.getItem('deliveryaddress') || '{}'
    );

    console.log(this.selectedProdut);
  }

  ngOnInit(): void {
    this.totalAmount = this.selectedProdut.standardPrice;
    //this.selectedProdut.discount;
    this.totalAmount = this.totalAmount - this.selectedProdut.discount;
    console.log(this.orderVM);
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
    localStorage.setItem('quantity', JSON.stringify(this.productCount));
    if (this.selectedProdut.paymentOption == 2177) {
      this.confirmOrderforCOD();
      //this.saveNotificaton()
    } else {
      this.route.navigate(['payment']);
      console.log(this.totalAmount);
      localStorage.setItem('totalamount', JSON.stringify(this.totalAmount));
    }
  }
  //notusing
  saveNotificaton() {
    debugger;
    this.notification.senderId = this.selectedProdut.sellerID;
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
    debugger;
    // console.log(this.forms);
    // this.forms.orderAmount = this.selectedProdut.standardPrice;
    // this.forms.discountAmount = this.selectedProdut.discount;
    // this.forms.totalAmount = this.totalamount;
    // this.fms.Payment(this.forms).subscribe((res) => {
    //   this.orderID = res;
    //   console.log(res);
    //   if (res) {
    //     ///this method called in confrom order payment
    //     // this.saveNotificaton()
    //     Swal.fire({
    //       icon: 'success',
    //       title: 'Order Confirmed!',
    //       text: 'You clicked the button!',
    //       // type: "success",
    //       timer: 500,
    //     });
    //     localStorage.setItem('orderID', JSON.stringify(this.orderID));
    //     this.route.navigate(['/customer/confirmorder']);
    //   }
    // });

    const payload = {
      sellingPrice: this.selectedProdut.standardPrice,
      discountAmount: this.selectedProdut.discount,
      productID: this.selectedProdut.productID,
      sellerID: this.selectedProdut.sellerID,
      stockQty: this.selectedProdut.stockQty,
      "itemID": 0,
      "orderID": 0,
      
      "quantity": 0,
      "unitPrice": 0,
      "discountType": 0,
      
      "isCancel": true,
      "cancelBy": 0,
      "isDelivered": true,
    };
    //  this.orderPayment.paymentAmount = this.totalAmount;
    const payment = {
      paymentID: 0,
      paymentDate: '',
      orderID: 0,
      paymentAmount: this.totalAmount,
      referenceNo: '',
      paymentMode: '2175',
      createdOn: '',
      paymentModeDesc: '',
    };
    //console.log(this.orderPayment);

    // "discountAmount" :this.selectedProdut.discount,
    // "productID" :this.selectedProdut.productID,
    // "sellerID" :this.selectedProdut.sellerID,
    // "stockQty" :this.selectedProdut.stockQty,

    //this.orderDetail = payload
   // console.log(this.orderDetail);
    this.orderVM = this.selectedProdut;
    this.orderVM.orderDetail = [];
    this.orderVM.orderDetail.push(payload);
    this.orderVM.orderPayment = payment;

    console.log(this.orderVM);
    this.fms.saveOrderCOD(this.orderVM).subscribe((res) => {
      console.log(res);
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
