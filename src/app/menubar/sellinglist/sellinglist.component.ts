import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';

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
  constructor(private fms: FmsService) {

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
    this.fms.getSellerListLatest(this.selectedOrder).subscribe(res => {
      console.log(res)
      this.sellerlst = res;
      console.log(this.sellerlst)
    })
  }

}
