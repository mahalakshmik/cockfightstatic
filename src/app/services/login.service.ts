import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseURL = environment.api;

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

    //budgetdetsave(payload){
    //  payload["id"]=0;
     
    //  payload["CampaignID"]=this.id;
  //  return this.http.post(this.baseURL +"operation/campaign/budgetdetails/save",payload)
  //}

  //deleteaccount(id){
   // return this.http.get(`${this.baseURL}advertiser/delete/${id}`)
  //}

}
