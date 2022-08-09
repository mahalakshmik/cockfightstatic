import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FmsService } from 'src/app/services/fms.service';

@Component({
  selector: 'app-shoplist',
  templateUrl: './shoplist.component.html',
  styleUrls: ['./shoplist.component.scss']
})
export class ShoplistComponent implements OnInit {
  shopId: string | null;
  shopList: any;

  constructor( private router: ActivatedRoute,private fms:FmsService) { 
    this.shopId = this.router.snapshot.paramMap.get('id');
    console.log(this.shopId)

  }

  ngOnInit() {
    this.getShopList();
  }
  getShopList(){
    this.fms.getShopList(this.shopId).subscribe(res =>{console.log(res);
    this.shopList = res;})
  }

}
