import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  notifications: any;

  constructor(private fms: FmsService) { }

  ngOnInit(): void {
    this.getNotification()
  }
  getNotification() {
    this.fms.getNotifications().subscribe(res => { console.log(res) ;
    this.notifications  = res;})
  }
}
