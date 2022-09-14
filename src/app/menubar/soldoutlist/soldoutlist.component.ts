import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@azure/core-http';
import { NgxSpinnerService } from 'ngx-spinner';
import { FmsService } from 'src/app/services/fms.service';

@Component({
  selector: 'app-soldoutlist',
  templateUrl: './soldoutlist.component.html',
  styleUrls: ['./soldoutlist.component.scss']
})
export class SoldoutlistComponent implements OnInit {
  soldoutList: any;
  totalAmt: number =0;

  constructor(private http: FmsService,public spinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getList()
  }
  getList() {
    this.spinnerService.show()
    this.http.soldOutList().subscribe(res => {
      this.soldoutList = res;
      this.soldoutList.orderDetail.forEach((data:any) => {
        this.totalAmt = (data.standardPrice * data.quantity) - data.discountAmount
        
      });
      //this.totalAmt = (this.soldoutList.orderDetail[0].standardPrice * this.soldoutList.orderDetail[0].quantity) - this.soldoutList.orderDetail[0].discountAmount
      this.spinnerService.hide()
      console.log(this.soldoutList)
    })
  }
}
