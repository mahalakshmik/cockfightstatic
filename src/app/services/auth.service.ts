import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FmsService } from './fms.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  AUTH_API = environment.api;
  userName: string | undefined;
  baseURL = environment.api;
  userdetail: any;
  imgURL = environment.imgUrl;
  profileImageFileOutFileLink: string = "http://viitortechnologies.com/images/4.JPG"
    
    constructor(private http: HttpClient,private fms: FmsService) { 
    this.userdetail = JSON.parse(localStorage.getItem('user') || '{}');
  }

  userLogin(object: any) {
    return this.http.post(`${this.baseURL}UserLogin`, object)
  }

  register(payload: any): Observable<any> {
    return this.http.post(this.AUTH_API + 'Members', payload);
  }
  SendOtp(payload: any): Observable<any> {
    payload.userId = this.userdetail.userId;
    return this.http.post(this.AUTH_API + 'Members/SendOtp', payload);
  }
  otpUpdate(payload: any): Observable<any> {
    payload.userId = this.userdetail.userId;
    return this.http.post(this.AUTH_API + 'Members/otpupdate', payload);
  }
 
  forgotpassword(payload: any): Observable<any> {
    return this.http.post(this.AUTH_API + 'Members/forgotpassword', payload);
  }
 
  verifyMobileNo(payload: any): Observable<any> {
    return this.http.post(this.AUTH_API + 'verifyMobileNo', payload);
  }
  passwordChange(payload: any): Observable<any> {
    payload.userId = this.userdetail.userId;
    return this.http.post(this.AUTH_API + 'Members/passwordChange', payload);
  }
  
  removePerson() {
    localStorage.removeItem('userName');
    this.userName = undefined;

  }
  getUsername() {
    const userdetails = JSON.parse(localStorage.getItem('user') || '{}');

    return userdetails.userName;
  }
  getPhoto() {
    const userdetails = JSON.parse(localStorage.getItem('user') || '{}');
    let profilepic=userdetails.profilePhoto
    if( profilepic == null){
      profilepic= "../../../assets/images/pic.jpg"
    }else{
      profilepic= this.imgURL+profilepic;
    }
    return profilepic;
  }

  getMemberType() {  
    const userdetails = JSON.parse(localStorage.getItem('user') || '{}');

    return userdetails.memberType;
  }
  
  logoutUser() {
    localStorage.clear()
    // this.route.navigate(['/login'])
  }
  //if no username then we will get error.
  getToken(){
    const userdetails = JSON.parse(localStorage.getItem('user') || '{}');

    return userdetails.userId;
  }
  isLoggedIn() {
    const usertoken = this.getToken();
    if (usertoken != null) {
      return true
    }
    return false;
  }
  getLoggedUserDetails() {
    const userdetails = JSON.parse(localStorage.getItem('user') || '{}');

    return userdetails;
  }
  getuserType() {
    const userdetails = JSON.parse(localStorage.getItem('user') || '{}');

    return userdetails.memberType;
  }
  isUserLoggedIn() {
    const usertoken = this.getToken();
    if (usertoken != null) {
      return true
    }
    return false;
  }
  getInbox() {
   
    this.fms.getInbox().subscribe((res) => {
      return res;
    });
  }
  inboxCount() {
   
    this.fms.getInboxCount().subscribe((res) => {
      return res;
    });
  }

  getCartList() {
    this.fms.cartList().subscribe((res) => {
      return res;
    });
  }
  getCartCount() {
    let count=0;
  count= JSON.parse(localStorage.getItem('cartCount') || '0');
  return count
  }
  getNotification() {
    const id=this.getToken();
    this.fms.getNotifications(id).subscribe((res:any) => {
      res=res((x:any)=>x.isRead === false).length;
     return res;
      
    });
  }



  // private prodCount: number = 0;
  // public prodCountCountChange: Subject<number> = new Subject();
  // updateCount(count: number = 0): void {
  //   this.prodCount = count;
  //   this.prodCountCountChange.next(this.prodCount);
  // }
  //KP08202020
  errorHandler
    (error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      switch (error.status) {
        case 400:
          alert("something went wrong, " + error.error.errorMessage);
          break;
        case 404:
          alert("something went wrong," + error.error.errorMessage);
          break;
        case (!error.ok):
          alert("something went wrong while connecting server")
      }
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
