import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FmsService } from 'src/app/services/fms.service';

@Component({
  selector: 'app-transporter-list',
  templateUrl: './transporter-list.component.html',
  styleUrls: ['./transporter-list.component.scss']
})
export class TransporterListComponent implements OnInit {
  transpId: any;
  transpLst: any;

  constructor(private fms: FmsService,private router:ActivatedRoute) {
    this.transpId = this.router.snapshot.paramMap.get('id');
    console.log(this.transpId)
   }

  ngOnInit(): void {
    this.getTransportList()

  }
  getTransportList() {
   this.fms.getTransportList(this.transpId).subscribe(res => {console.log(res)
  this.transpLst = res;})
  }
}
