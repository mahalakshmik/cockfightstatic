import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.scss']
})
export class FollowingComponent implements OnInit {
  following: any;

  constructor(private fms:FmsService) { }
  ngOnInit(): void {
    this.getFollowerLst();
  }
  getFollowerLst(){
    this.fms.getFollowersList().subscribe(res => {console.log(res);
    this.following = res})
  }

}
