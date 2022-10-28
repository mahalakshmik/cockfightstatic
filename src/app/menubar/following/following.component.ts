import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { FmsService } from 'src/app/services/fms.service';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.scss']
})
export class FollowingComponent implements OnInit {
  following: any;

  constructor(private fms:FmsService,private spinner:NgxSpinnerService) { }
  ngOnInit(): void {
    this.getFollowerLst();
  }
  getFollowerLst(){
    this.spinner.show();
    this.fms.getFollowingList().subscribe(res => {
    this.spinner.hide();
      
    this.following = res})
  }

}
