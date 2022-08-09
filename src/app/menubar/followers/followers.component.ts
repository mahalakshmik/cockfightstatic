import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.scss']
})
export class FollowersComponent implements OnInit {
  follower: any;

  constructor(private fms:FmsService) { }

  ngOnInit(): void {
    this.getFollowerLst();
  }
  getFollowerLst(){
    this.fms.getFollowersList().subscribe(res => {console.log(res);
    this.follower = res})
  }

}
