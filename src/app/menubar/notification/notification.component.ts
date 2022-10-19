import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth.service';
import { FmsService } from 'src/app/services/fms.service';
import { NotificationService } from 'src/app/services/Notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  notifications: any;
  userID: any;

  constructor(private fms: FmsService,private ns:NotificationService,private as: AuthService,
    public spinnerService: NgxSpinnerService,private router:Router
    ) {
      const userDetails = this.as.getLoggedUserDetails();
      this.userID = userDetails.userId;
     }

  ngOnInit(): void {
    this.spinnerService.show()
    this.getNotification()
  }
  getNotification() {
    this.fms.getNotifications(this.userID).subscribe(res => { 
    this.spinnerService.hide()
      
    this.notifications  = res;
  })
  }
  markAsRead(){
    this.spinnerService.show();
    this.ns.updateAllNotifications().subscribe(res =>{console.log(res)
    if(res){
      this.spinnerService.hide();
      this.getNotification();
    }else{
      this.spinnerService.hide();
    }})
  }
changeStatus(id:number){
  this.spinnerService.show();
  this.ns.updateNotification(id).subscribe(res=>{debugger
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
