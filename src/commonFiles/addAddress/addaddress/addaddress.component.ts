import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FmsService } from 'src/app/services/fms.service';
import { Address } from 'src/commonFiles/register/register.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addaddress',
  templateUrl: './addaddress.component.html',
  styleUrls: ['./addaddress.component.scss']
})
export class AddaddressComponent implements OnInit {
  form = new Address;
  public listItemskey: Array<{ text: string; value: number; }> = [
    { text: "Please Select", value: 0 },
    { text: "Home", value: 2175 },
    { text: "Office", value: 2176 },
  ];
  constructor(public dialogRef: MatDialogRef<AddaddressComponent>, public fms: FmsService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.listItemskey;
    console.log(data)
    if(data != null){
      this.form = data;
    }
  }

  ngOnInit(): void {
    this.form.addressType = 0;
  }
  onNoClick() {
    
    this.dialogRef.close('false');
  }

  onSubmit() {
    console.log(this.form)
    this.fms.saveAddress(this.form).subscribe(res => {
      console.log(res);
      this.dialogRef.close('true');
      if (res) {
        Swal.fire({
          icon: 'success',
          title: "Address created Succesfully!",
          text: "",
          // type: "success",
          timer: 700
        });
      }
    },error =>{
      console.log(error);
      Swal.fire({
        icon: 'warning',
        title: "Address create failed!",
        text: "",
        // type: "success",
        timer: 700
      });
    })
  }
}
