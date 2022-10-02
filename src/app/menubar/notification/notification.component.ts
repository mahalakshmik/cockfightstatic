import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth.service';
import { FmsService } from 'src/app/services/fms.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  notifications: any;
  userID: any;

  constructor(private fms: FmsService,private as: AuthService,
    public spinnerService: NgxSpinnerService,private router:Router
    ) {
      const userDetails = this.as.getLoggedUserDetails();
      this.userID = userDetails.userId;
     }

  ngOnInit(): void {
    this.getNotification()
  }
  getNotification() {
    this.fms.getNotifications(this.userID).subscribe(res => { console.log(res) ;
    this.notifications  = res;
  })
  }
  markAsRead(){
    this.fms.updateAllNotifications().subscribe(res =>{console.log(res)})
  }
changeStatus(id:number){
  this.spinnerService.show();
  this.fms.updateNotification(id).subscribe(res=>{
    console.log(res)
    if(res){
      this.spinnerService.hide();
      this.getNotification();
    }
  })
}
vieworder(id:string){
  this.router.navigate(['farm/vieworder/'+id])
}
}
