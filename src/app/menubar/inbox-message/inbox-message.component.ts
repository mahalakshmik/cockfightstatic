import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FmsService } from 'src/app/services/fms.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-inbox-message',
  templateUrl: './inbox-message.component.html',
  styleUrls: ['./inbox-message.component.scss']
})
export class InboxMessageComponent implements OnInit {
  memberid: number = 0;
  userid: number = 0;
  sub: any;
  inboxlst: any;
  

  constructor(private route: ActivatedRoute,private spinnerService: NgxSpinnerService, private fms: FmsService) {
    
    this.sub = this.route.params.subscribe(params => {
      this.memberid = +params['memberType']; // (+) converts string 'id' to a number
      this.userid = +params['senderID']; // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.
    });
    
  }

  ngOnInit(): void {
    this.getInboxList();
  }
  getInboxList() {
    this.spinnerService.show();
    this.fms.getInbox().subscribe((res:any) => {
      this.spinnerService.hide();
      if(res){
      
      
      for (let i = 0; i < res.messageHeader.length; i++) {
        res.messageHeader[i].messageDetails= []
        res.messageHeader[i].messageDetails = res.messageDetails.filter((j: { messageID: any; }) => j.messageID == res.messageHeader[i].messageID);
        
       res.messageHeader[i].isRead= res.messageHeader[i].messageDetails.some((x:any) => x.isRead === false);
       console.log( res.messageHeader[i].isRead)
      }
      this.inboxlst = res;
      console.log( this.inboxlst);

//       if any messagedetails array contains false header making true;
// bcz if false means no read
// but if length 0 then (this all doing bcz header don't have read status taking from details)
    }
    })
  }
}