import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, Subject, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FmsService } from './fms.service';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    private notificationsSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    private inboxcountSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    public notifications$ = this.notificationsSubject.asObservable();
    public inboxcount$=this.inboxcountSubject.asObservable();
    private _refreshNeeded$ = new Subject<void>();
    private _refreshNeededForinbox$ = new Subject<void>();
    userdetails: any;
    baseURL = environment.api;

    get refreshNeeded$() {
      return this._refreshNeeded$;
    }
    get refreshNeededForinbox$() {
      return this._refreshNeededForinbox$;
    }
    constructor(private http: HttpClient) {
        this.userdetails = JSON.parse(localStorage.getItem('user') || '{}');
       
      }
    public updateNotifications(value: number): void {
        this.notificationsSubject.next(value);
    }
    saveNotifications(payload: any) {
        // payload.memberId = this.userdetails.userId
        payload.senderId = this.userdetails.userId;
        return this.http.post(`${this.baseURL}Notifications`, payload);
      }
     
      updateAllNotifications() {
        this.userdetails = JSON.parse(localStorage.getItem('user') || '{}');
    
        return this.http.get(`${this.baseURL}NotificationListSP/UpdateAllNotifications/${this.userdetails.userId}`)
        .pipe(tap(()=>{
          this._refreshNeeded$.next();
        }));
      }
      getNotifications(userid: any) {
        this.userdetails = JSON.parse(localStorage.getItem('user') || '{}');
        
        return this.http.get(`${this.baseURL}NotificationListSP/` + userid + '/50');
      }
      NotificationList() {
        return this.http.get(`${this.baseURL}Notifications`);
      }
      updateNotification(notyid: number) {debugger
        return this.http.get(
          `${this.baseURL}NotificationListSP/UpdateNotificationstatus/` + notyid)
          .pipe(
            tap(() =>  {
              this._refreshNeeded$.next();
            })
          );
      } 


      // inbox
  
  
      getInboxdetails(messageid: any,membertype: any) {
        return this.http.get(
          `${this.baseURL}Profile/InboxDetail/`+messageid+'/'+membertype+'/' +this.userdetails.userId 
        ).pipe(tap(()=>{this._refreshNeededForinbox$.next()}))
      }
}