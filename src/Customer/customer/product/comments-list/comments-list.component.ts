import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth.service';
import { FmsService } from 'src/app/services/fms.service';
import { LoginService } from 'src/app/services/login.service';
import { LoginComponent } from 'src/commonFiles/login/login.component';
import { MessageHeader } from 'src/commonFiles/profile/profile.modal';
import Swal from 'sweetalert2';
import { Comment } from "./comment.model";

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.scss']
})
export class CommentsListComponent implements OnInit { 
  @Input() comment!: Comment ;
  form: any = new MessageHeader();
  comments:any;
  isEditing = false;
  userid: any;
  matDialogRef!: MatDialogRef<LoginComponent>;
  messageId: any;
  sellerID: any =0;
  //productID: string | null;
  breeddialogRef:any;
  constructor(  private fms: FmsService,
    private ls: LoginService,
    private route: Router,
    private router: ActivatedRoute,
    public as: AuthService,
    private matDialog: MatDialog,
    public spinnerService: NgxSpinnerService) {
    this.sellerID = JSON.parse(localStorage.getItem('sellerID')|| '{}');
    //using snapshot alos we will get this


    }

  ngOnInit() {

  }

  replyClick() {
    this.isEditing = !this.isEditing;
  }

  onAdd($event:any) {debugger
    this.form.comment=$event;
    console.log(this.comment)
    this.postComment(this.comment)
     this.isEditing = false;
  }
  // getComments() {
  //   this.productID = this.router.snapshot.paramMap.get('productID');

  //   this.fms.getpostcomment(this.productID).subscribe((res: any) => {
  //     //console.log(res);
  //     this.message = res;
  //   });
  // }
  postComment(payload:any) {debugger
    
    this.userid = this.as.getToken();
  //  this.spinnerService.show();

    if (!this.userid) {
  //  this.spinnerService.hide();

      this.Login();
    } else {
      if (this.form) {
        //check here if message goes wrong mostly sellerid
        this.form.productId = payload.productID;
        this.form.senderId = this.userid;
        this.form.receiverId = this.sellerID;

        //console.log(this.form);
        this.fms.postcomment(this.form).subscribe((res: any) => {
          //console.log(res);
          this.messageId = res;
          if (res) {
            // this.form.messageId = res
            var payload = {
              itemId: 0,
              messageId: res,
              memberId: this.userid,
              messageTo: this.sellerID,
              comment: this.form.comment,
              createdOn: '2022-08-16T06:38:00.037Z',
              isRead: true,
            };
            this.sendMessage(payload);
            //});
          }
          //this.ngOnInit();
        });
      }
    }
  }

  sendMessage(payload:any){
    this.spinnerService.show();

    this.ls.postCommnetsls(payload).subscribe((data: any) => {
      this.spinnerService.hide();
      this.form.messageSubject='';

      //console.log(data);
      if(data){
       // this.getComments();

      }
    });
  }
  Login() {
    this.matDialogRef = this.matDialog.open(LoginComponent, {
      // data: { name: this.name },
      disableClose: true,
      width: '400px',
      height: '550px',
    });

    this.matDialogRef.afterClosed().subscribe((res: any) => {
      if (res == true) {
        // this.name = "";
      }
    });
  }


  dialogbox(breedtemplate: any,comment:any) {
    this.userid = this.as.getToken();
    debugger
    if (!this.userid) {
      this.Login();
    } else {
      this.breeddialogRef = this.matDialog.open(breedtemplate, {
        width: '300px',
        disableClose: true,
      });

    }
  }

  SendMessageToSeller(comment:any) {debugger
    this.userid = this.as.getToken();
      
    //before send message check login
    // alert(this.userdetails.userid)
    // const userid= this.as.getToken();
    if (!this.userid) {
      this.Login();
    } else {
      if (this.form.fileName == "")
      {
        this.form.fileName= "nofile";
      }
      var formdata = new FormData();
      formdata.append('messageId', '0');
      formdata.append('senderId', comment.senderID);
      formdata.append('receiverId', this.userid);
      formdata.append('productId', comment.productID);
      formdata.append('createdOn', '2022-08-16T06:38:00.037Z');
      formdata.append('fileName', this.form.fileName);
      formdata.append('messageSubject', this.form.messageSubject);
    // withour filename also updating the savecomments use name 'nofile' to validte
      this.fms.sendMessageToseller(formdata).subscribe((res:any) => {debugger
        console.log(res);
      // this.isHide = res.success
        if (res) {
          this.breeddialogRef.close();
          Swal.fire({
            icon: 'success',
            title: 'Message Sent',
            text: 'Message To Seller Successfully',
            // type: "success",
            timer: 500,
          });
          var comentspayload = {
            itemId: 0,
            messageId: res,
            memberId: this.userid,
            messageTo: comment.senderID,
            comment: this.comments,
            createdOn: '2022-08-16T06:38:00.037Z',
            isRead: false,
          };
          this.sendMessage(comentspayload);

        }
      });
      // //console.log(this.form)
    }
  }
}