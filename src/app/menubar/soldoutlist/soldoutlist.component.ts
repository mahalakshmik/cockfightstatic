import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@azure/core-http';
import { NgxSpinnerService } from 'ngx-spinner';
import { FmsService } from 'src/app/services/fms.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-soldoutlist',
  templateUrl: './soldoutlist.component.html',
  styleUrls: ['./soldoutlist.component.scss']
})
export class SoldoutlistComponent implements OnInit {
  soldoutList: any;
  totalAmt: number =0;
  orderData: any;
  productPicUrl = environment.azureblobImgUrl;
  fileuploadUrl=environment.fileUrl
  constructor(private http: FmsService,public spinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getList()
  }
  getList() {
    this.spinnerService.show()
    this.http.soldOutList().subscribe((res:any) => {
      for (let i = 0; i < res.orderHeader.length; i++) {
        res.orderHeader[i].orderDetails=[]
        res.orderHeader[i].orderPayment=[]
        var resu = res.orderDetail.filter((j: { orderID: any; })=>j.orderID==res.orderHeader[i].orderID);
        var payment = res.orderPayment.filter((j: { orderID: any; })=>j.orderID==res.orderHeader[i].orderID);
        res.orderHeader[i].orderDetails=resu
        res.orderHeader[i].orderPayment.push(payment[0])
      }

      this.spinnerService.hide();
      console.log(res.orderHeader)
      this.orderData = res.orderHeader;
    })
  }
}
