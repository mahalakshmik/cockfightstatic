import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseURL = environment.api;
private _refershNeededs=new Subject<void>();
  constructor(private http:HttpClient) { }

// produtList(){
//   return this.http.get(`${this.baseURL}productMasters/productSearch`)
// }
 memberListbyId(userid:number){
   return this.http.get(`${this.baseURL}Members/List/`+userid)
 }
 genderLookup(){
  return this.http.get(`${this.baseURL}Lookups/Gender`)
 }
 breadLookup(){
  return this.http.get(`${this.baseURL}Lookups/BreedType`)
 }
 paymentTypeLookup(){
  return this.http.get(`${this.baseURL}Lookups/PaymentType`)
 }
  userRegister(payload:any){
  
    payload["userId"]=0;
    payload["status"]=true;
   
  return this.http.post(`${this.baseURL}Members`,payload)
}
//later make two apis one
  userRegisterUpdate(payload:any){
  return this.http.post(`${this.baseURL}Members/ProfileUpdate`,payload)
}


getLookUp(){
  return this.http.get(`${this.baseURL}Lookup`)
}
// refresh api concept
 
get refreshNeedes(){
  return this._refershNeededs;
}
getALichotehkies(productId:any): Observable<postcomments[]> {
  return this.http.get<postcomments[]>(`${this.baseURL}MessageDetails/ProductComments/${productId}`);

}

postCommnetsls(payload: any):Observable<postcomments> {
  //api/MessageDetails/saveMessageDetails
  return this.http.post<postcomments>(`${this.baseURL}MessageDetails/saveMessageDetails`,payload)
  .pipe(tap(()=>{
this._refershNeededs.next();
  }));
}

}
export interface postcomments {
  senderName: string;
  createdOn: string;
  messageID: any;
  productID: any;
  senderID: any;
  comment?:any
}
