import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FmsService } from 'src/app/services/fms.service';
import { Notificationvm } from 'src/commonFiles/payment/ordersave.model';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vieworder',
  templateUrl: './vieworder.component.html',
  styleUrls: ['./vieworder.component.scss']
})
export class VieworderComponent implements OnInit {
  orderNumber: any;
  orderHistory: any;
  notification = new Notificationvm();
  selectedProdut: any;
  userdetails: any;
  orderID: any;
  productPicUrl = environment.ProductUrl;
  images:any;

  constructor(private fms: FmsService, private route: ActivatedRoute, private router: Router,private spinnerService: NgxSpinnerService) {
    this.orderNumber = this.route.snapshot.paramMap.get('id');
    this.selectedProdut = JSON.parse(
      localStorage.getItem('selectedProdutList') || '{}'
    );
    this.userdetails = JSON.parse(localStorage.getItem('user') || '{}');
    console.log(this.userdetails.userId)
    // this.orderID = JSON.parse(localStorage.getItem('orderID') || '{}');
  }

  ngOnInit() {
    this.spinnerService.show()
    this.fms.viewOrderByNumber(this.orderNumber).subscribe(res => {

      console.log(res)
      this.orderHistory = res;
      this.spinnerService.hide()

      this.orderID = this.orderHistory.orderHeader[0]?.orderID
      console.log(this.orderID)
    })
  }
  confirmDelivered() {
    this.spinnerService.show()
    this.fms.orderConfirmDelivery(this.orderID).subscribe(res => {
      console.log(res)
      if (res) {
        this.spinnerService.hide()
        Swal.fire({
          icon: 'success',
          title: "Order Confrimed to Delivery !",
          text: "Order will deliverd soon!",
          // type: "success",
          timer: 700
        });
        this.router.navigateByUrl('/')
      }
    })
    this.spinnerService.hide()
  }
  CloseOrder(id:any){

  }
  cancelOrder() {
    //need to check orderid for list pages it may b not corect
    this.fms.orderCancel(this.orderID,this.userdetails.userId,this.orderNumber).subscribe(res =>{
      console.log(res)
      if (res) {
        Swal.fire({
          icon: 'success',
          title: "Order Cancelled !",         
          // type: "success",
          timer: 700
        });
        this.router.navigateByUrl('/')
      }
    })
    this.spinnerService.hide()
  }
  saveNotificaton() {
    this.notification.memberId = this.selectedProdut.sellerID;
    this.notification.message =
      'New Order Received: ' +
      '(' +
      // this.orderdetails[0].orderNo +
      ') from  ' +
      this.userdetails.userName +
      ' for product ' +
      this.selectedProdut.productName;
    console.log(this.notification);
    this.fms.saveNotifications(this.notification).subscribe((res) => {
     
      console.log(res);
      if (res) {
        // this.fms
        //   .updateStock(this.selectedProdut.productID, this.selectedquntity)
        //   .subscribe((data) => {
        //     console.log(data);
        //   });
      }
    });
  }
}
