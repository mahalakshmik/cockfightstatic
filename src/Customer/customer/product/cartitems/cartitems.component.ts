import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cartitems',
  templateUrl: './cartitems.component.html',
  styleUrls: ['./cartitems.component.scss']
})
export class CartitemsComponent implements OnInit {
  cartLst: any;

  constructor(private fms: FmsService) { }

  ngOnInit(): void {
    this.getCartList();
  }
  getCartList() {
    this.fms.cartList().subscribe(res => {
      console.log(res);
      this.cartLst = res;

    })
  }
  delete(cartID: number) {
    Swal.fire({
      title: 'Are you sure you want to delete the record?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, go ahead.',
      cancelButtonText: 'No, let me think'
    }).then((result) => {
      if (result.value) {
        
      this.deleteCart(cartID)

      }
    })

  }
  deleteCart(cartID:number) {
    
    this.fms.deleteCartList(cartID).subscribe(res => {
      console.log(res);
      if (res) {
        
       // this.alert();
        this.getCartList()
      }
    })
  }

  alert() {
    
    Swal.fire({
      title: 'Deleted Successfully',
      icon: 'success',
      timer: 300
    })
  }
}
