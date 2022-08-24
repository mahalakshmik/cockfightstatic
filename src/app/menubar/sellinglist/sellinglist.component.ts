import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { FmsService } from 'src/app/services/fms.service';
import { environment } from 'src/environments/environment';

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

  constructor(private fms: FmsService,public spinnerService: NgxSpinnerService) {

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
    this.fms.getSellerListLatest(this.selectedOrder).subscribe(res => {
      console.log(res)
      this.sellerlst = res;
      this.spinnerService.hide();
      console.log(this.sellerlst)
    })
  }

}
