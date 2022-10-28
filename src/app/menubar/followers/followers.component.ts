import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { FmsService } from 'src/app/services/fms.service';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.scss']
})
export class FollowersComponent implements OnInit {
  follower: any;

  constructor(private fms:FmsService,private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.getFollowerLst();
  }
  getFollowerLst(){
    this.spinner.show();

    this.fms.getFollowersList().subscribe(res => {
    this.spinner.hide();
      
      console.log(res);
    this.follower = res})
  }

}
