import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FmsService } from 'src/app/services/fms.service';
import { Notificationvm } from 'src/commonFiles/payment/ordersave.model';
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
  constructor(private fms: FmsService, private route: ActivatedRoute,private router:Router) {
    this.orderNumber = this.route.snapshot.paramMap.get('id');
    this.selectedProdut = JSON.parse(
      localStorage.getItem('selectedProdutList') || '{}'
    );
    this.userdetails = JSON.parse(localStorage.getItem('user') || '{}');
   // this.orderID = JSON.parse(localStorage.getItem('orderID') || '{}');
  }

  ngOnInit() {
    this.fms.viewOrderByNumber(this.orderNumber).subscribe(res => {
      console.log(res)
      this.orderHistory = res;
     this.orderID = this.orderHistory.orderHeader[0]?.orderID
     console.log(this.orderID)
    })
  }
  confirmDelivered() {
    this.fms.orderConfirmDelivery(this.orderID).subscribe(res => {
      console.log(res)
      if(res){
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
  }
  cancelOrder() {

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
      debugger
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
