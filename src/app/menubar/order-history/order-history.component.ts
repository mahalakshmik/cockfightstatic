import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FmsService } from 'src/app/services/fms.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {
  orderHistory: any;
  productPicUrl = environment.azureblobImgUrl;
  constructor(private fms: FmsService,private router: Router) {
  }

  ngOnInit() {
    this.getOrderHistory()
  }
  getOrderHistory() {
    this.fms.getOrderHistory().subscribe(res => {
      console.log(res);
      this.orderHistory = res;
    })
  }


  CancelOrder(id:any){
    
  }
}
