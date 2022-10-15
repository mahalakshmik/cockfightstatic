import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth.service';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';
import { LoginComponent } from '../login/login.component';
import { Member } from './register.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  isLoading: boolean = false;

  public form: Member;
  matDialogRef!: MatDialogRef<LoginComponent>;
  isverifyOtp: boolean = false;
  isregister: boolean = true;
  verifyOTP: any;
  recievedOtp: any;
  constructor(public dialogRef: MatDialogRef<RegisterComponent>, public router: Router, private spinnerService: NgxSpinnerService,
    private sr: LoginService, private as: AuthService, private matDialog: MatDialog
  ) {
    this.form = new Member();
    console.log(this.form)
  }
  ///svc
  ngOnInit() {
    this.form.memberType = '';
    this.form.countrycode = '';
  }

  public listItemskey: Array<{ text: string; value: number; }> = [
    { text: "Farm", value: 2171 },
    { text: "Transport", value: 2172 },
    { text: "Shop", value: 2173 },
  ];
  public countryCode: Array<{ text: string; value: any; }> = [
    { text: "Country Code", value: '' },
    { text: "India", value: '+91' },
    { text: "China", value: '+86' },
    { text: "Thailand", value: '+66' },
  ];
  //   farm:2171
  // user:2170
  // transporter:2172
  // shop:2173
  // home:2175
  // office:2177

  onNoClick() {
    this.dialogRef.close();

  }
  // @Input() mobileNo: any;
  // proper = false;

  // valPhone() {
  //   // first remove unwanted characters
  //   let mobileNo  = this.mobileNo;
  //   mobileNo = mobileNo.replace(/[^0-9+#]/g, "");
  //   // at least 10 in number
  //   if (mobileNo.length >= 10) {
  //     this.proper = mobileNo;
  //     return true;
  //   } else {
  //     this.proper = false;
  //   }
  //   return false;
  // }
  // forms: any = {

  //   userId: 0,
  //   userName:null,
  //   password :null,
  //     firstName :null,
  //     lastName :null,
  //   emailId: null,
  //   mobileNo: null,
  //   memberType: null,
  //   otp: null,
  //   isOtpsent: false,
  //   otpsentDate: null,
  //   isResendOtp: false,
  //   isOtpverified: false,
  //   isActive: true,
  //   createdOn: null,
  //   aboutUs: null,
  //   website: null,
  //   profilePhoto: null,
  //   isAcceptedTermsConditions: false
  // };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  ///
  verifymobileNO() {
    this.as.verifyMobileNo(this.form.mobileNo).subscribe(ress => { console.log(ress) })
  }
  onSubmit() {
    this.spinnerService.show();
    //this.verifymobileNO();
    //this.isLoading = true;
    if (this.form) {
      
      this.sr.userRegister(this.form).subscribe({
        next: data => {
        //  this.isLoading = false;
        this.isregister=false;
          this.isverifyOtp = true;
          this.isSignUpFailed = false;
          this.spinnerService.hide();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Registered SuccessFully Please verifiy OTP!!',
            showConfirmButton: false,
            timer: 1500
           } )
          var payload = {
            userId: '',
            mobile: this.form.mobileNo,
            countryCode: this.form.countrycode,
          }

           this.as.SendOtp(payload).subscribe(res=>{
                     console.log(res)
          this.recievedOtp=res;
           })
        
        },
        error: error => {
          this.spinnerService.hide();
          console.log(error)
          this.errorMessage = error.error.message;
          this.isSignUpFailed = true;
          if (error.status == 404) {

            Swal.fire('Error', error.error, 'error');
          } else {
            Swal.fire('Error', error.error.message, 'error');

          }
          console.log('oops', this.errorMessage);
          //alert(error.error.message)
        }
      });
    }
  }

  openModal() {

    this.matDialogRef = this.matDialog.open(LoginComponent, {
      data: { name: '' },
      disableClose: true,
      'width': "400px",
      'height': "550px"
    });

    this.matDialogRef.afterClosed().subscribe(res => {
      if ((res == true)) {
        //later handle
      }
    });
  }
  verifyOtp() {
    if(this.recievedOtp != this.verifyOTP){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'OTP is incorrect',
        showConfirmButton:false,
        timer:1500
        
      })
    }else{

      var payload = {
        UserId: this.form.mobileNo,
        Password: ''
      }
  
      this.as.otpUpdate(payload).subscribe(res => {
        console.log(res)
        if (res) {
  
  
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your OTP has been Verified!!',
            showConfirmButton: false,
            timer: 1500
          })
          this.dialogRef.close();
  
          this.openModal();
        }
      })
    }
  }
}