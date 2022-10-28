import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { FmsService } from 'src/app/services/fms.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  wishlist: any;
  productPicUrl = environment.azureblobImgUrl;
  product: any;
  userdetails: any;

  constructor(private fms: FmsService,private sp :NgxSpinnerService) { 
    this.userdetails = JSON.parse(localStorage.getItem('user') || '{}');
  }

  ngOnInit(): void {
    this.getWishList()
  }
  getWishList() {
    this.sp.show();
    this.fms.getWishList().subscribe(res => { 
    this.wishlist = res;
    this.sp.hide();
  
  })
  }
  WishItemDelete(id:number){

    
    Swal.fire({
  title: 'Are you sure?',
  text: "You won't be able to Delete this!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes, delete it!'
}).then((result) => {
  if (result.isConfirmed) {
    
    this.fms.deleteWishList(id).subscribe( res=>{
if(res){

  Swal.fire(
    'Deleted!',
    'Your record has been deleted.',
    'success',
  )
  this.getWishList();
}
    })
  }



})
  
  }
  getproductbyid(pid:number){
    this.fms.productidforcart(pid).subscribe(
      res=>{
        this.product= res;
        var payload = {
          CartId: 0,
          ProductId: this.product.productID,
          SellerId: this.product.sellerID,
          MemberId: this.userdetails.userId,
          Quantity: 1,
          UnitPrice: this.product.standardPrice,
          Currency: this.product.currency,
          DiscountAmount: this.product.discount,
          DiscountType: 0,
          TotalAmount: 65,
          IsGuest: false,
          stockQty: this.product.stockQty <= 0 ? 0 : 1,
          PaymentOptionDesc: this.product.paymentOptionDesc,
        };
      
        payload.TotalAmount = payload.Quantity * payload.UnitPrice;
      }
    )
  }
  MoveToCart(productId:number,wishid:number){debugger
    this.sp.show()
    let payload;
    this.fms.productidforcart(productId).subscribe(
      res=>{
      this.product= res;
      console.log(res)
       payload = {
        CartId: 0,
        ProductId: this.product.productId,
        SellerId: this.product.sellerId        ,
        MemberId: this.userdetails.userId,
        Quantity: 1,
        UnitPrice: this.product.standardPrice,
        Currency: this.product.currency,
        DiscountAmount: this.product.discount,
        DiscountType: 0,
        TotalAmount: 65,
        IsGuest: false,
        stockQty: this.product.stockQty <= 0 ? 0 : 1,
        PaymentOptionDesc: this.product.paymentOptionDesc,
      };
    
      payload.TotalAmount = payload.Quantity * payload.UnitPrice;
      console.log(payload)
      if(payload.ProductId){
        this.fms.moveToCart(productId,wishid,payload).subscribe(
          res=>{
            console.log(res)
            if(res){
              this.fms.deleteWishList(wishid).subscribe(data=>{
                console.log(data)
                this.getWishList();
              })
            }
          }
        ) 
      }
    }
  )
 
                    //cartitem.DiscountAmount = cartitem.Quantity * cartitem.DiscountAmount;
  

}
 



}
