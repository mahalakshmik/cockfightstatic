import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { deliveryaddress } from 'src/app/menubar/models/deliveryaddress.model';
import { OrderPayment } from 'src/app/menubar/models/orderpayment.model';
import { AuthService } from 'src/app/services/auth.service';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2';
import { Notificationvm, OrderSave } from './ordersave.model';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  totalamount: any;
  selectedProdut: any;
  forms: any = new OrderSave();
  notification = new Notificationvm();
  address = new deliveryaddress();
  savePayment=new OrderPayment();
  orderID: any;
  imageUrl: any;
  fileToUpload: any;
  constructor(private fms: FmsService, private route: Router) {
    this.totalamount = JSON.parse(localStorage.getItem('totalamount') || '{}');
    this.selectedProdut = JSON.parse(localStorage.getItem('selectedProdut') || '{}');
    this.address = JSON.parse(localStorage.getItem('deliveryaddress') || '{}');
  }

  ngOnInit(): void {
    console.log(this.address)
  }
  confirmOrder() {
    //save orderheader2.save orderdetails.3.save deliveryaddrs.4.update stock
    console.log(this.forms);
    this.forms.orderAmount = this.selectedProdut.standardPrice;
    this.forms.discountAmount = this.selectedProdut.discount;
    this.forms.totalAmount = this.totalamount;
    var formdata = new FormData();
    // formdata.append('PaymentAmount', this.forms.orderAmount);
    // formdata.append('PaymentAmount', this.forms.discountAmount);
    // formdata.append('OrderId', this.forms.OrderId);
    // formdata.append('ReferenceNo', '2165');
    // formdata.append('PaymentMode', '2165');
    // formdata.append('file', this.fileToUpload);
    this.fms.Payment(this.forms).subscribe((res) => {
      this.orderID = res;
      console.log(res);

      localStorage.setItem('orderID', JSON.stringify(this.orderID));
      this.address.orderID = this.orderID;
      this.fms.saveDeliveryAddress(this.address).subscribe(res => {
        alert(res)
        if (res) {
          Swal.fire({
            icon: 'success',
            title: 'Order Confirmed!',
            text: '',
            // type: "success",
            timer: 500,
          });
        }
        this.route.navigate(['/customer/confirmorder']);
      })

    });
  }
  uploadFile(e: any) {
    this.fileToUpload = e.target.files[0];

    //Show image preview
    let reader = new FileReader();
    reader.readAsDataURL(this.fileToUpload);
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    };

  }
}
