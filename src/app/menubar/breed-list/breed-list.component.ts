import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-breed-list',
  templateUrl: './breed-list.component.html',
  styleUrls: ['./breed-list.component.scss']
})
export class BreedListComponent implements OnInit {
  breedLst: any;
  breeddialogRef: any;
  breadName: any
  data: any;
  constructor(private fms: FmsService, private dialog: MatDialog, private router: Router, private activatedRoute: ActivatedRoute) {


  }

  ngOnInit(): void {
    this.getBread()
  }
  editBread(data: any, templateRef: any) {
    console.log(data);
    this.data = data
    this.breadName = data.breedName;
    console.log(this.breadName);

    this.breeddialogRef = this.dialog.open(templateRef, {
      width: '300px'
    });
  }
  addBread(templateRef: any) {
    this.breeddialogRef = this.dialog.open(templateRef, {
      width: '300px'
    });
  }
  getBread() {
    this.fms.getBreeds().subscribe(res => {
      console.log('bread', res);
      this.breedLst = res
    })
  }
  SaveBreed() {
    var payload = {

      "farmId": 0,
      "breedId": 0,
      "breedName": this.breadName,
    }
   // this.data.breedName = this.breadName;
    this.fms.saveBreadList(payload).subscribe(
      res => console.log('HTTP response', res),
      err => {
        console.log('HTTP Error', err.error),
        () => console.log('HTTP request completed.'),
        Swal.fire({
          icon: 'warning',
          title: err.error,
          // text: "You clicked the button!",
          // type: "success",
          //timer: 500
        });
        this.getBread()
      } ,
    );
    
    this.breeddialogRef.afterClosed().subscribe((data:any) => {
      console.log("data returned from mat-dialog-close is ", data);
    })


  }

  deletebread(data: any, index: number) {
    this.alertConfirmation(data, index)
  }
  alertConfirmation(rowdata: any, index: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: ' you want to delete the Breed, this action cannot be undone',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, go ahead.',
      cancelButtonText: 'No, let me think'
    }).then((result) => {
      if (result.value) {
        
        this.breedLst.splice(index, 1);
      }
    })
  }
}
