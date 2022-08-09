import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  notifications: any;

  constructor(private fms: FmsService) { }

  ngOnInit(): void {
    this.getNotification()
  }
  getNotification() {
    this.fms.getNotifications().subscribe(res => { console.log(res) ;
    this.notifications  = res;
  })
  }

}
