import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2';
import { Notificationvm, OrderSave } from './ordersave.model';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  totalamount: any;
  selectedProdut: any;
  forms: any = new OrderSave;
  notification = new Notificationvm;
  orderID: any;
  constructor(private fms: FmsService, private route: Router) {
    this.totalamount = JSON.parse(localStorage.getItem('totalamount') || '{}')
    this.selectedProdut = JSON.parse(localStorage.getItem('selectedProdut') || '{}')
   
  }

  ngOnInit(): void {
  }
  confirmOrder() {
    console.log(this.forms)
    this.forms.orderAmount = this.selectedProdut.standardPrice;
    this.forms.discountAmount = this.selectedProdut.discount;
    this.forms.totalAmount = this.totalamount;
    this.fms.Payment(this.forms).subscribe(res => {
      this.orderID = res;
      console.log(res)
      if (res) {
        Swal.fire({
          icon: 'success',
          title: "Order Confirmed!",
          text: "You clicked the button!",
          // type: "success",
          timer: 500
        });
        localStorage.setItem('orderID',JSON.stringify(this.orderID))
        this.route.navigate(['/customer/confirmorder'])
      }
    })

  }
}
