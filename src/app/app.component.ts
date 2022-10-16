import { Component } from '@angular/core';
import { withModule } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { LoginComponent } from 'src/commonFiles/login/login.component';
import { RegisterComponent } from 'src/commonFiles/register/register.component';
import { AuthService } from './services/auth.service';
import { FmsService } from './services/fms.service';
import { NotificationService } from './services/Notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  matDialogRef!: MatDialogRef<LoginComponent>;
  name: string = '';
  showlist: boolean = false;
  user: any | null;
  userName: any;
  cartLst: any;
  notifications: any;
  notifcount: any=0;
  inbox: any;
  userID: any;
  memberType: any;
  inboxcount: number=0;
  //userType: any;
  public notifications$: Observable<number> | undefined;
  constructor(
    private matDialog: MatDialog,private as: AuthService,public ns: NotificationService,
    private fms: FmsService,
    public dataService: AuthService,
    private spinner: NgxSpinnerService
  ) {
    const userDetails = this.as.getLoggedUserDetails();
    this.userID = userDetails.userId;
    //this.username = userDetails.userName;
    this.memberType = userDetails.memberType;
    this.user = localStorage.getItem('user');
    if (this.user) {
     this.getCartList();
     this.getnotificationcount();
  

    // this.getInbox();
    this.getInboxCount();

      this.userName = this.user.userName;
    }
  }
  logout() {
   // alert('test')
    localStorage.clear();
  }
  OpenModal() {
    this.matDialogRef = this.matDialog.open(LoginComponent, {
      data: { name: this.name },
      disableClose: true,
      width: '400px',
      height: '550px',
    });

    this.matDialogRef.afterClosed().subscribe((res) => {
      if (res == true) {
        this.name = '';
        this.showlist = false;
        //later handle
      }
    });
  }

  openlist() {
    this.showlist = !this.showlist;
  }

  getCartList() {
    this.fms.cartList().subscribe((res) => {
      this.cartLst = res;
    });
  }
  getInbox() {
    // this.fms.getInbox().subscribe(res =>{console.log(res);
    // this.inbox = res;})
    this.fms.getInbox().subscribe((res) => {
      this.inbox = res;
    });
  }

  getInboxCount(){
 this.fms.getInboxCount().subscribe((res:any)=>{
  console.log(res)
  if(res != -1){

    this.inboxcount=res[0].count;
  }
   });
   console.log(this.inboxcount)
  }
  // getNotification() {
  //   this.notifcount= this.dataService.notifyCount();
  //   console.log( this.dataService.notifyCount())
    
   
  // }
getnotificationcount(){let res=[]
  // res= this.notifications.filter((x:any)=> x.isRead === false)
  
  // this.notifcount=res.length;

  //   console.log(res);
  this.fms.getNotificationCount().subscribe((res:any)=>
    {
      console.log(res);
      this.notifcount=res;

    }
  )
}
  ngOnInit() {
    this.ns.refreshNeeded$.subscribe(res=>{
      this.getnotificationcount();

    })
   // this.notifications$ = this.notificationService.notifications$
  }
}
