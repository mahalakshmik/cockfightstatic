import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@azure/core-http';
import { FmsService } from 'src/app/services/fms.service';

@Component({
  selector: 'app-soldoutlist',
  templateUrl: './soldoutlist.component.html',
  styleUrls: ['./soldoutlist.component.scss']
})
export class SoldoutlistComponent implements OnInit {
  soldoutList: any;

  constructor(private http:FmsService) { }

  ngOnInit(): void {
  }
getList(){
this.http.soldOutList().subscribe(res=>{
this.soldoutList=res;
})
}
}
