
import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import { Notificationvm } from 'src/commonFiles/payment/ordersave.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-confirmorder-payment',
  templateUrl: './confirmorder-payment.component.html',
  styleUrls: ['./confirmorder-payment.component.scss']
})
export class ConfirmorderPaymentComponent implements OnInit {
  selectedProdut: any;
  orderdetails: any;
  quatity: any;
  notification = new Notificationvm;
  userdetails: any;
  productID: any;
  productPicUrl = environment.ProductUrl;
  images: any;
  orderID: any;
  constructor(private fms: FmsService) {
    this.selectedProdut = JSON.parse(localStorage.getItem('selectedProdut') || '{}')
    this.userdetails = JSON.parse(localStorage.getItem('user') || '{}');
    this.productID = JSON.parse(localStorage.getItem('productID') || '{}')
    this.images = JSON.parse(localStorage.getItem('images') || '{}')
    this.orderID = JSON.parse(localStorage.getItem('orderID') || '{}');
console.log('orderid',this.orderID)
  }

  ngOnInit(): void {
   this.getOrderConform();
  }

  getOrderConform() {
    this.fms.getconformOrder(this.orderID).subscribe((res:any) => {
      console.log(res)
      this.orderdetails = res;
      console.log(this.orderdetails[0].orderNo)
      if(res){
        this.saveNotificaton()
      }
      this.quatity = this.orderdetails.totalAmount / this.orderdetails.orderAmount;
      console.log('qty',this.quatity)
      //console.log(this.orderdetails[0].orderAmount)
    })
  }
  saveNotificaton() {
    this.notification.senderId = this.selectedProdut.sellerId;
    this.notification.message = "New Order Received: " + '(' + this.orderdetails[0].orderNo + ') from'
      + this.userdetails.userName + 'for product' + this.selectedProdut.productName;
    console.log(this.notification)
    this.fms.saveNotifications(this.notification).subscribe(res => {
      console.log(res)
    })
  }

}
