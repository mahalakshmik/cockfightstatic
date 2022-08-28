import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { FmsService } from 'src/app/services/fms.service';
import { Notificationvm } from 'src/commonFiles/payment/ordersave.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-confirmorder-payment',
  templateUrl: './confirmorder-payment.component.html',
  styleUrls: ['./confirmorder-payment.component.scss'],
})
export class ConfirmorderPaymentComponent implements OnInit {
  selectedProdut: any;
  orderdetails: any;
  quatity: any;
  notification = new Notificationvm();
  userdetails: any;
  productID: any;
  productPicUrl = environment.ProductUrl;
  images: any;
  orderID: any;
  selectedquntity: number = 1;
  deliveryaddress: any;
  total: any;
  constructor(private fms: FmsService,public spinnerService: NgxSpinnerService) {
    this.selectedProdut = JSON.parse(
      localStorage.getItem('selectedProdutList') || '{}'
    );
    this.userdetails = JSON.parse(localStorage.getItem('user') || '{}');
    this.productID = JSON.parse(localStorage.getItem('productID') || '{}');
    this.images = JSON.parse(localStorage.getItem('images') || '{}');
    this.orderID = JSON.parse(localStorage.getItem('orderID') || '{}');
    this.selectedquntity = JSON.parse(localStorage.getItem('quantity') || '{}');
    this.deliveryaddress = JSON.parse(
      localStorage.getItem('deliveryaddress') || '{}'
    );
    console.log('orderid', this.selectedProdut);
  }

  ngOnInit(): void {
    this.getOrderConform();
  }

  getOrderConform() {
    this.spinnerService.show()
    this.fms.getconformOrder(this.orderID).subscribe((res: any) => {
      console.log(res);
      this.orderdetails = res;
      this.total = this.orderdetails[0].orderAmount - this.orderdetails[0].discountAmount
      console.log(this.orderdetails[0].orderNo);
      if (res) {
        this.spinnerService.hide()
      //  this.saveNotificaton();
      }
      this.quatity =
        this.orderdetails.totalAmount / this.orderdetails.orderAmount;
      console.log('qty', this.quatity);
      this.spinnerService.hide()
      //console.log(this.orderdetails[0].orderAmount)
    });
  }
  saveNotificaton() {
    this.notification.memberId = this.selectedProdut.sellerID;
    this.notification.message =
      'New Order Received: ' +
      '(' +
      this.orderdetails[0].orderNo +
      ') from  ' +
      this.userdetails.userName +
      ' for product ' +
      this.selectedProdut.productName;
    console.log(this.notification);
    this.fms.saveNotifications(this.notification).subscribe((res) => {debugger
      console.log(res);
      if (res) {
        this.fms
          .updateStock(this.selectedProdut.productID, this.selectedquntity)
          .subscribe((data) => {
            console.log(data);
          });
      }
    });
  }
}
