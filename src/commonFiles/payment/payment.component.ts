import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  orderID: any;
  imageUrl: any;
  fileToUpload: any;
  constructor(private fms: FmsService, private route: Router) {
    this.totalamount = JSON.parse(localStorage.getItem('totalamount') || '{}');
    this.selectedProdut = JSON.parse(
      localStorage.getItem('selectedProdut') || '{}'
    );
  }

  ngOnInit(): void {}
  confirmOrder() {
    console.log(this.forms);
    this.forms.orderAmount = this.selectedProdut.standardPrice;
    this.forms.discountAmount = this.selectedProdut.discount;
    this.forms.totalAmount = this.totalamount;
    this.fms.Payment(this.forms).subscribe((res) => {
      this.orderID = res;
      console.log(res);
      if (res) {
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
  uploadFile(e: any) {
    debugger;
    this.fileToUpload = e.target.files.item(0);

    //Show image preview
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    };
   // reader.readAsDataURL(this.fileToUpload);
    if (e.target.files.item(0)) {
      reader.readAsDataURL(this.fileToUpload);
    }
    ///////
    // let reader = new FileReader();
    // reader.onload = (event: any) => {
    //   this.imageUrl = event.target.result;
    //   console.log(this.imageUrl);
    // };
    // reader.onload = function(){
    //   let output: any = document.getElementById('blah');
    //   output.src = reader.result;
    // }

    // if (event.target.files[0]) {
    //   reader.readAsDataURL(event.target.files[0]);
    // }

    //////////////
    // this.fileToUpload = file.item(0);

    //Show image preview
    //let reader = new FileReader();
    // let file = event.target.files[0];
    // reader.onload = (event: any) => {
    //   this.imageUrl = event.target.result;
    // }
    // reader.readAsDataURL(file);
    //main
    // let reader = new FileReader(); // HTML5 FileReader API
    // let file = event.target.files[0];
    // reader.readAsDataURL(file);
    // console.log(file)

    // if (event.target.files && event.target.files[0]) {
    //   reader.readAsDataURL(file);

    //   // When file uploads set it to file formcontrol
    //   // reader.onload = () => {
    //   //   this.imageUrl = reader.result;
    //   //   this.registrationForm.patchValue({
    //   //     file: reader.result
    //   //   });
    //   //   this.editFile = false;
    //   //   this.removeUpload = true;
    //   // }
    //   // // ChangeDetectorRef since file is loading outside the zone
    //   // this.cd.markForCheck();
    // }
  }
}
