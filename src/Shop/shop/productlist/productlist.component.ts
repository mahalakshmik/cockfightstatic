import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FmsService } from 'src/app/services/fms.service';
import { environment } from 'src/environments/environment';

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
  productPicUrl = environment.azureblobImgUrl;

  constructor(private fms: FmsService,private router: ActivatedRoute,public spinnerService: NgxSpinnerService,public route:Router) { 
    this.productID = this.router.snapshot.paramMap.get('productID');
    this.sellerID = this.router.snapshot.paramMap.get('sellerID');
    this.shopId = this.router.snapshot.paramMap.get('ID');
  }
  ngOnInit(): void {
    this.spinnerService.show();
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
    this.spinnerService.hide();

    })
  }
  follower(){
    this.route.navigateByUrl('/menu/FollowedList')
    
  }

}
