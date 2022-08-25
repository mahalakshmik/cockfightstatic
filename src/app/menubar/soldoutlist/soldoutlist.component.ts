import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@azure/core-http';
import { NgxSpinnerService } from 'ngx-spinner';
import { FmsService } from 'src/app/services/fms.service';

@Component({
  selector: 'app-soldoutlist',
  templateUrl: './soldoutlist.component.html',
  styleUrls: ['./soldoutlist.component.scss']
})
export class SoldoutlistComponent implements OnInit {
  soldoutList: any;

  constructor(private http: FmsService,public spinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getList()
  }
  getList() {
    this.spinnerService.show()
    this.http.soldOutList().subscribe(res => {
      this.soldoutList = res;
      this.spinnerService.hide()
      console.log(this.soldoutList)
    })
  }
}
