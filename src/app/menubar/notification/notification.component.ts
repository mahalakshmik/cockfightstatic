import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FmsService } from 'src/app/services/fms.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  notifications: any;

  constructor(private fms: FmsService,
    public spinnerService: NgxSpinnerService,private router:Router
    ) { }

  ngOnInit(): void {
    this.getNotification()
  }
  getNotification() {
    this.fms.getNotifications().subscribe(res => { console.log(res) ;
    this.notifications  = res;
  })
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
