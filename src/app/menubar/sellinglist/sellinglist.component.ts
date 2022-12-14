import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { FmsService } from 'src/app/services/fms.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sellinglist',
  templateUrl: './sellinglist.component.html',
  styleUrls: ['./sellinglist.component.scss']
})
export class SellinglistComponent implements OnInit {
  sellerlst: any;
  sellerType: any;
  selectedOrder: number | undefined;
  selectedValue: any;
  productPicUrl = environment.azureblobImgUrl;
  fileuploadUrl = environment.fileUrl
  orderData: any;
  totalAmt: number = 0;
  selectedlng:string='en';
  constructor(private fms: FmsService, public spinnerService: NgxSpinnerService) {
this.selectedlng='th';
const data=localStorage.getItem('lng');
if(data != null){
  this.selectedlng=data;
} 
  }

  ngOnInit(): void {
    this.sellerTypedrp();
    this.selectedOrder = 2180;
    this.getSellerList();
  }
  onChange(e: any) {
    console.log(e.target.value)
    this.selectedOrder = e.target.value;

    this.getSellerList()
    //this.sellerlst=this.sellerlst.filter((i:any)=>i.OrderStatus==value);
  }
  sellerTypedrp() {
    this.fms.getSellerListType().subscribe(res => {
      console.log(res);
      this.sellerType = res;
    })
  }
  getSellerList() {
    this.spinnerService.show();


    this.fms.getSellerListLatest(this.selectedOrder).subscribe((res: any) => {

      for (let i = 0; i < res.orderHeader.length; i++) {
        res.orderHeader[i].orderDetails = []
        res.orderHeader[i].orderPayment = []
        var resu = res.orderDetail.filter((j: { orderID: any; }) => j.orderID == res.orderHeader[i].orderID);
        var payment = res.orderPayment.filter((j: { orderID: any; }) => j.orderID == res.orderHeader[i].orderID);
        res.orderHeader[i].orderDetails = resu
        res.orderHeader[i].orderPayment.push(payment[0])
      }

      this.spinnerService.hide();
      console.log(res.orderHeader)
      this.orderData = res.orderHeader;

    })
  }
  CancelOrder(id: any, orderno: any) {
    
    this.spinnerService.show();

    const cancelby = '0'
    this.fms.orderCancel(id, cancelby, orderno).subscribe(res => {
      console.log(res)
      this.spinnerService.hide();
      Swal.fire({
        title: 'Order Cancelled Successfully',
        icon: 'success',
        timer: 700,
      });
      this.getSellerList();

    })
  }
  Confirmdelivery(id: any) {
    this.spinnerService.show();

    this.fms.orderConfirmDelivery(id).subscribe(res => {
      console.log(res)
      this.spinnerService.hide();
      if (res) {
        Swal.fire({
          title: 'Order Confirmed Successfully',
          icon: 'success',
          timer: 700,
        });
        this.getSellerList();
      }
    })
  }
  updateStock() {
  //  this.fms.updateStock(const t,cont p)
  //         .subscribe((data) => {console.log(data);});
  }
  closeOrder(id: any) {

    this.fms.orderClose(id).subscribe(res => {
      console.log(res)
      this.spinnerService.hide();
      if (res) {
        Swal.fire({
          icon: 'success',
          title: "Order Closed !",
          // type: "success",
          timer: 700
        });
        this.getSellerList();

      }

    })
  }

  ConformPayment(id: any) {
    this.spinnerService.show();

    this.fms.orderconfirmPayment(id).subscribe(
      res => {
      console.log(res)
      this.spinnerService.hide();
      if (res) {
        Swal.fire({
          title: 'Order Confirmed Successfully',
          icon: 'success',
          timer: 700,
        });
        this.getSellerList();
      }
    },
    error =>{
      console.error(error.error.text)
         this.spinnerService.hide();
         Swal.fire
         ({
          title: error.error.text,
          icon: 'error',
          text: 'Please Cancel the Order!',
        });
    }
    
    
    )
  }
}

