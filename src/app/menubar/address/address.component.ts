import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FmsService } from 'src/app/services/fms.service';
import { AddaddressComponent } from 'src/commonFiles/addAddress/addaddress/addaddress.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  addresslist: any;

  constructor(private dialog:MatDialog,private fms: FmsService) { }

  ngOnInit(): void {
    this.getAddressList();
  }
  getAddressList() {
    // alert('')
    this.fms.addressList().subscribe(res => {
      this.addresslist = res;
      console.log(this.addresslist)
    })
  }
  openDialog() {
    this.dialog.open(AddaddressComponent, {
      width: '800px',
      height: '700px',
      //data: rowdata
    });
  }
  edit(rowdata: any, i: number) {
    console.log(rowdata)

    this.dialog.open(AddaddressComponent, {
      width: '800px',
      height: '700px',
      data: rowdata[i]
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
          this.fms.deleteAddress(rowdata[0]).subscribe(res => {
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
