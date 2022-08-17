import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FmsService } from 'src/app/services/fms.service';

@Component({
  selector: 'app-vieworder',
  templateUrl: './vieworder.component.html',
  styleUrls: ['./vieworder.component.scss']
})
export class VieworderComponent implements OnInit {
  orderNumber: any;
  orderHistory: any;

  constructor(private fms:FmsService,private route:ActivatedRoute) { 
    this.orderNumber=this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
      this.fms.viewOrderByNumber(this.orderNumber).subscribe(res=>{
        console.log(res)
        this.orderHistory=res;
      })
  }
}
