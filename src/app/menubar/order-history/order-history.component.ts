import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FmsService } from 'src/app/services/fms.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {
  orderHistory: any;
  productPicUrl = environment.azureblobImgUrl;
  message: boolean=false;
  orderData: any;
  fileuploadUrl=environment.fileUrl
  constructor(private fms: FmsService,private router: Router,public spinnerService: NgxSpinnerService) {
  }

  ngOnInit() {
    this.getOrderHistory()
  }
  getOrderHistory() {
    this.fms.getOrderHistory().subscribe((res:any) => {
      if(res.orderDetail.length ==0){
          this.message=true
          this.orderHistory =[]
        }else{

          
          
      for (let i = 0; i < res.orderHeader.length; i++) {
        res.orderHeader[i].orderDetails=[]
        res.orderHeader[i].orderPayment=[]
        var resu = res.orderDetail.filter((j: { orderID: any; })=>j.orderID==res.orderHeader[i].orderID);
        var payment = res.orderPayment.filter((j: { orderID: any; })=>j.orderID==res.orderHeader[i].orderID);
        res.orderHeader[i].orderDetails=resu
        res.orderHeader[i].orderPayment.push(payment[0])
      }
      this.orderHistory = res;
      console.log( this.orderHistory );
      this.orderData = res.orderHeader;

        }
        
    })
  }


  CancelOrder(id:any,orderno:any){
    this.spinnerService.show();

    const cancelby='0'
this.fms.orderCancel(id,cancelby,orderno).subscribe(res=>{
  console.log(res)
  this.spinnerService.hide();
  Swal.fire({
    title: 'Order Cancelled Successfully',
    icon: 'success',
    timer: 700,
  });
  this.getOrderHistory()


})
  }
}
