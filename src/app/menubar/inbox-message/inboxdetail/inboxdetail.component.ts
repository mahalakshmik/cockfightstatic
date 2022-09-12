import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FmsService } from 'src/app/services/fms.service';

@Component({
  selector: 'app-inboxdetail',
  templateUrl: './inboxdetail.component.html',
  styleUrls: ['./inboxdetail.component.scss']
})
export class InboxdetailComponent implements OnInit {
  sub: any;
  memberid: number=0;
  messageid: number=0;
  messageDetails: any[]=[];
  messageHeader:any []=[];
  senderid: number=0;
  comments:string='';
  constructor(private route: ActivatedRoute,private fms:FmsService,private spinnerService: NgxSpinnerService) { 

     
    this.sub = this.route.params.subscribe(params => {
      this.memberid = +params['memberType']; // (+) converts string 'id' to a number
      this.messageid = +params['messageID']; // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.
    });
  }

  ngOnInit(): void {
    this.spinnerService.show();

    this.getdetails();
  }
  getdetails(){

    this.fms.getInboxdetails(this.messageid,this.memberid,).subscribe((res:any)=>{
      this.messageDetails=res.messageDetails
      this.messageHeader=res.messageHeader
      console.log(this.messageDetails)
      console.log(this.messageHeader)
    this.spinnerService.hide();

      if(this.messageHeader.length ==0){
        this.senderid=0

      }
 
    })
  }
  InboxPostComments(){
    this.spinnerService.show();

    const userid=0
    // assuming mesaageto
    var payload = {
      itemId: 0,
      messageId: this.messageid,
      memberId: userid,
      comment: this.comments,
      messageTo: this.messageDetails[0].messageTo,
      createdOn: '2022-08-16T06:38:00.037Z',
    };
    this.fms.postCommnets(payload).subscribe(rs=>{
      console.log(rs)
      this.comments=''
      this.getdetails();
    })
  }
}
