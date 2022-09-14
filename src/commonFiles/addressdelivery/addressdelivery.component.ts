import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router, Routes } from '@angular/router';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2';
import { AddaddressComponent } from '../addAddress/addaddress/addaddress.component';

@Component({
  selector: 'app-addressdelivery',
  templateUrl: './addressdelivery.component.html',
  styleUrls: ['./addressdelivery.component.scss']
})
export class AddressdeliveryComponent implements OnInit {
  addresslist: any;
  selectAddres:number=0;
  addresselect: any | undefined;
  constructor(private fms: FmsService,private dialog:MatDialog,private route:Router) { }

  ngOnInit() {
   this.getaddressesList();
  }
  getaddressesList(){
    this.fms.addressList().subscribe((res:any) => {
      this.addresslist = res;
      console.log(this.addresslist)
    })
  }
  continue(){
    if(this.addresselect != undefined){
     
      this.route.navigate(['/customer/OrderSummuary'])
    }else{
      alert('Address is Required')
    }
   // this.getaddress(this.addresselect);
    
  }
  getaddress(i:any){
  //  alert(i)
    this.addresselect = i;
    localStorage.setItem('deliveryaddress',JSON.stringify(i))

  }
  edit(rowdata: any, i: number) {debugger
    console.log(rowdata)

    const dialogs=this.dialog.open(AddaddressComponent, {
      width: '700px',
      height: '700px',
      data: rowdata[i]
    });
    dialogs.afterClosed().subscribe((res:any) => {
      //alert(res)
      if (res === true) {
        this.ngOnInit()
      }
    });
  }

  openaddressDialog() {
  const dialogsave =  this.dialog.open(AddaddressComponent, {
      width: '800px',
      height: '700px',
      //data: rowdata
    });
    dialogsave.afterClosed().subscribe((res:any) => {
     // alert(res)
      if (res === true) {
        this.ngOnInit()
      }
    });
  }
  delete(rowdata: any, i: number) {
    console.log(rowdata)
    Swal.fire({
      title: 'Are you sure you want to delete the record?',

      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, go ahead.',
      cancelButtonText: 'No, let me think'
    }).then((result) => {

      if (result.value) {
          this.fms.deleteAddress(rowdata[i]).subscribe(res => {
            console.log(res)
            if (res) {
              this.ngOnInit();
            }
          }

         );

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',


        )
      }
    })
  }
}
