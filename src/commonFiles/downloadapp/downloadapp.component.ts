import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-downloadapp',
  templateUrl: './downloadapp.component.html',
  styleUrls: ['./downloadapp.component.scss']
})
export class DownloadappComponent implements OnInit {
  matDialogRef!: MatDialogRef<LoginComponent>;

  constructor(private matDialog:MatDialog ,public as: AuthService ) { }

  ngOnInit(): void {
  }
  chat(){
    if(!this.as.isLoggedIn()){

      this.OpenModal();
    }
  }
  OpenModal() {

    this.matDialogRef = this.matDialog.open(LoginComponent, {
      data: '{ name: this.name }',
      disableClose: true,
      'width': "400px",
      'height': "550px"
    });

    this.matDialogRef.afterClosed().subscribe(res => {
      if ((res == true)) {
      //  this.name = "";
      //  this.showlist = false;
        //later handle
      }
    });
  }
}
