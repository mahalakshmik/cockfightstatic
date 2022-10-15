import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
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
  orderID: any;
  userdetails: any;
  errormessage: string = '';
  orderDetail: any;
  orderPayment: any;

  imageUrl: any;
  fileToUpload: any;

  showPaymentPage: boolean = true;
  deliveryaddress: any;
  isCart: boolean;
  constructor(private route: Router, private fms: FmsService, public spinnerService: NgxSpinnerService) {
    this.selectedProdut = JSON.parse(
      localStorage.getItem('selectedProdut') || '{}'
    );
    this.productID = JSON.parse(localStorage.getItem('productID') || '{}');
    this.images = JSON.parse(localStorage.getItem('images') || '{}');
    this.sellerName = JSON.parse(localStorage.getItem('sellerName') || '{}');
    this.userdetails = JSON.parse(localStorage.getItem('user') || '{}');
    //this.orderVM = this.selectedProdut;
    this.deliveryaddress = JSON.parse(localStorage.getItem('deliveryaddress') || '{}');
    this.isCart = JSON.parse(localStorage.getItem('isCart') || '')

//save totalamount at increment and decrement
    console.log(this.selectedProdut);
  }

  ngOnInit(): void {
    
    //userid mandatory for delete cart
    this.orderVM.deliveryAddress = this.deliveryaddress;
    this.isCart = JSON.parse(localStorage.getItem('isCart') || '')
    if (this.isCart) {
      // getting orderdetails from the api based on userid
      let cartdata: any;
      this.cartlistorder();
      //cartdata = JSON.parse(localStorage.getItem('CartOrder')|| '{}')
      console.log(cartdata)

    } else {

      //this.totalAmount = this.selectedProdut.standardPrice;
      //this.selectedProdut.discount;
      this.totalAmount = this.selectedProdut.standardPrice - this.selectedProdut.discount;
    }
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

    if (this.isCart) {
      this.cartOrderSave();

    } else {

      if (this.selectedProdut.paymentOption == 2177) {
        this.confirmOrderforCOD();
      }
      else {
        // this.route.navigate(['payment']);
        this.showPaymentPage = false;
        this.confirmPayment();
        //check y saving
        localStorage.setItem('totalamount', JSON.stringify(this.totalAmount));
      }
    }
  }
 
  confirmOrderforCOD() {
    ;
    this.spinnerService.show();

    //#payment options are two types  vvvimp
    //type1  >> online
    // // If PaymentOption = CASHONDELIVERY (2177), then add a default order payment object with PaymentAMount = 0;
    // ReferenceNo = PaymentOptionDescripton,
    //                 OrderID = order.OrderID,
    //                 PaymentMode = PaymentOption,
    //                 PaymentDate = DateTime.Now,
    //                 PaymentAmount = 0
    //type2  >> cod and others
    // ReferenceNo = filename,
    // OrderID = order.OrderID,
    // PaymentMode = PaymentOption,
    // PaymentDate = DateTime.Now,
    // PaymentAmount = order.TotalAmount
    ////#endregion type1


    const payload = {
      sellingPrice: this.selectedProdut.standardPrice,
      discountAmount: this.selectedProdut.discount,
      productID: this.selectedProdut.productID,
      sellerID: this.selectedProdut.sellerID,
      stockQty: this.selectedProdut.stockQty,
      "itemID": 0,
      "orderID": 0,
      "quantity": this.productCount,
      "unitPrice": 0,
      "discountType": 0,
      "isCancel": false,
      "cancelBy": 0,
      "isDelivered": false,
    };
    const payment = {
      paymentID: 0,
      paymentDate: '2022-08-24T02:39:36.104Z',
      orderID: 0,
      paymentAmount: this.totalAmount,
      referenceNo: '',
      paymentMode: '2177',
      createdOn: '2022-08-24T02:39:36.104Z',
      paymentModeDesc: '',
    };

    this.orderVM.memberID = this.userdetails.userId;
    this.orderVM.addressId = this.deliveryaddress.addressId;
    this.orderVM.orderAmount = this.selectedProdut.standardPrice;
    this.orderVM.discountAmount = this.selectedProdut.discountAmount;
    this.orderVM.currency = this.selectedProdut.currency;
    this.orderVM.paidAmount = this.totalAmount;
    this.orderVM.totalAmount = this.totalAmount;
    this.orderVM.orderAmount = this.totalAmount;
    this.orderVM.userId=this.userdetails.userId;

    this.orderVM.orderDetail = [];
    this.orderVM.orderDetail.push(payload);
    this.orderVM.orderPayment = payment;

    console.log(this.orderVM);
    this.fms.saveOrderCOD(this.orderVM).subscribe((res) => {
      this.orderID = res;
      console.log(res);
      if (res) {
        this.spinnerService.hide();
        Swal.fire({
          icon: 'success',
          title: 'Order Confirmed!',
          text: 'You clicked the button!',
          // type: "success",
          timer: 500,
        });
        //later change to router id
        localStorage.setItem('orderID', JSON.stringify(this.orderID));
        this.route.navigate(['/customer/confirmorder']);
      }
    });
    this.spinnerService.hide()
  }
  //cart
  cartOrderSave() {
    //check all data sending properly
    this.spinnerService.show();
    const payment = {
      paymentID: 0,
      paymentDate: '2022-08-24T02:39:36.104Z',
      orderID: 0,
      paymentAmount: 0,
      referenceNo: '',
      paymentMode: '2177',
      createdOn: '2022-08-24T02:39:36.104Z',
      paymentModeDesc: '',
    };
    this.orderVM.orderPayment = payment;
    if (this.orderVM.orderDetail[0].paymentOption == 2177) {
      localStorage.setItem('totalamount', JSON.stringify(this.totalAmount));

      this.fms.saveOrderCOD(this.orderVM).subscribe((res) => {
        // this.spinnerService.hide();
        this.orderID = res;
        console.log(res);
        if (res) {
          this.spinnerService.hide();
          Swal.fire({
            icon: 'success',
            title: 'Order Confirmed!',
            text: 'You clicked the button!',
            timer: 500,
          });
          //later change to router id
          localStorage.setItem('orderID', JSON.stringify(this.orderID));

          this.route.navigate(['/customer/confirmorder']);
        }
      });
    } else {

      this.showPaymentPage = false;
      this.fms.saveOrderOnline(this.orderVM).subscribe((res) => {
        this.orderID = res;
        console.log(res);
        localStorage.setItem('orderID', JSON.stringify(this.orderID));
  
      });
    }
  }
 
  confirmPayment() {

    const payload = {
      sellingPrice: this.selectedProdut.standardPrice,
      discountAmount: this.selectedProdut.discount,
      productID: this.selectedProdut.productID,
      sellerID: this.selectedProdut.sellerID,
      stockQty: this.selectedProdut.stockQty,
      "itemID": 0,
      "orderID": 0,
      "quantity": this.productCount,
      "unitPrice": 0,
      "discountType": 0,
      "isCancel": false,
      "cancelBy": 0,
      "isDelivered": false,
    };


    this.orderVM.memberID = this.userdetails.userId;
    this.orderVM.addressId = this.deliveryaddress.addressId;
    this.orderVM.orderAmount = this.selectedProdut.standardPrice;
    this.orderVM.discountAmount = this.selectedProdut.discount;
    this.orderVM.currency = this.selectedProdut.currency;
    this.orderVM.paidAmount = this.totalAmount;
    this.orderVM.totalAmount = this.totalAmount;
    this.orderVM.orderAmount = this.totalAmount;
    this.orderVM.userId=this.userdetails.userId;

    this.orderVM.orderDetail = [];
    this.orderVM.orderDetail.push(payload);
    // this.orderVM.orderPayment = payment;
    localStorage.setItem('totalamount', JSON.stringify(this.totalAmount));

    this.fms.saveOrderOnline(this.orderVM).subscribe((res) => {
      this.orderID = res;
      console.log(res);
      localStorage.setItem('orderID', JSON.stringify(this.orderID));

    });
  }
  savePayment() {
if(this.isCart){
  this.totalAmount=this.orderVM.orderAmount;
  //need to check total amount 
}
    var formdata = new FormData();
    formdata.append('PaymentAmount', this.totalAmount,);
    formdata.append('OrderId', this.orderID);
    formdata.append('ReferenceNo', this.fileToUpload.name);
    formdata.append('PaymentMode', '2178');
    formdata.append('paymentID', '0');
    formdata.append('paymentDate', '2022-08-24T02:39:36.104Z');
    formdata.append('createdOn', '2022-08-24T02:39:36.104Z');
    formdata.append('file', this.fileToUpload);
    this.fms.SavePayment(formdata).subscribe((res) => {
      if (res) {
        Swal.fire({
          icon: 'success',
          title: 'Order Confirmed!',
          text: '',
          timer: 700,
        });

        this.route.navigate(['/customer/confirmorder']);
      }
    });
  }
  cartlistorder() {
    
    this.fms.cartOrderList().subscribe((res: any) => {
      console.log('orderlist', res)
      this.orderVM = res;
      this.orderVM.deliveryAddress = this.deliveryaddress;
      this.orderVM.addressId = this.deliveryaddress.addressId;
      this.selectedProdut.paymentOption = this.orderVM.orderDetail[0].paymentOption;
      this.orderVM.orderNo = '0'
      console.log(this.orderVM.orderDetail)
      this.orderVM.orderDetail.forEach((data:any) => {
        var cartPrice = data.unitPrice;
        console.log(cartPrice)
      });
    })
  }
  cartIncrement(p:any,i:any){
    if (this.orderVM.orderDetail[i].stockQty == this.productCount) {
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
  decrement() {
    this.errormessage = '';

    this.productCount--;
    if (this.productCount == 1) {
      this.disable = true;
    }
    this.totalAmount = this.selectedProdut.standardPrice * this.productCount;
    this.totalAmount = this.totalAmount - this.selectedProdut.discount;
  }

  cartDecrement(p:any,i:any){
    this.errormessage = '';

    this.productCount--;
    if (this.productCount == 1) {
      this.disable = true;
    }
    this.totalAmount = this.selectedProdut.standardPrice * this.productCount;
    this.totalAmount = this.totalAmount - this.selectedProdut.discount;
  }

  uploadFile(e: any) {
    this.fileToUpload = e.target.files[0];
    console.log(this.fileToUpload.name)
 
    //Show image preview
    let reader = new FileReader();
    reader.readAsDataURL(this.fileToUpload);
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    };

  }

   //notusing
   saveNotificaton() {

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
}
