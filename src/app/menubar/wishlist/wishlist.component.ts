import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  wishlist: any;

  constructor(private fms: FmsService) { }

  ngOnInit(): void {debugger
    this.getWishList()
  }
  getWishList() {
    this.fms.getWishList().subscribe(res => { console.log(res) ;
    this.wishlist = res;})
  }
}
