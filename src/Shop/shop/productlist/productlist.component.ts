import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FmsService } from 'src/app/services/fms.service';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.scss']
})
export class ProductlistComponent implements OnInit {
  shopdetails: any;
  myaddress: any;
  productLst: any;
  productID: any;
  sellerID: any;
  shopId: string | null;
  constructor(private fms: FmsService,private router: ActivatedRoute) { 
    this.productID = this.router.snapshot.paramMap.get('productID');
    this.sellerID = this.router.snapshot.paramMap.get('sellerID');
    this.shopId = this.router.snapshot.paramMap.get('ID');
  }
  ngOnInit(): void {
    this.getShopDetails();
  }
  getShopDetails() {
    this.fms.getShopDetails(this.shopId).subscribe(res => {
      console.log(res)
      this.shopdetails = res;
      this.productLst = this.shopdetails.products
      this.myaddress = this.shopdetails.address.landmark + ',' + this.shopdetails.address.locality + ',' + this.shopdetails.address.memberAddress
        + ',' + this.shopdetails.address.state + ',' + this.shopdetails.address.zipCode
      console.log(this.productLst)
      console.log(this.shopdetails)
    })
  }
  follower(){
    
  }

}
