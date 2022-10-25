import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth.service';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  matDialogRef!: MatDialogRef<RegisterComponent>;
  isLoginpage: boolean = true;
  isverifyOtp: boolean = false;
  isforgetPass: boolean = false;
  memberType: any;
  isLoading: boolean = false;
  form1: FormGroup;
  OTP: any;
  mobileno: any;
  // public string EmailId { get; set; }
  // public string Password { get; set; }
  // public string MobileNo { get; set; }
  constructor(private readonly fb: FormBuilder, public dialogRef: MatDialogRef<LoginComponent>,
    private matDialog: MatDialog, private fms: FmsService, private as: AuthService, private spinnerService: NgxSpinnerService) {
    this.form = this.fb.group({

      userId: ['', Validators.required],
      MobileNo: [''],
      Password: ['', Validators.required,],

    })
    this.form1 = this.fb.group({

      mobile: ['', Validators.required],
      countryCode: ['', Validators.required],
      Password: ['', Validators.required,],
      verifyOtp: ['', Validators.required,],

    })
  }
  public countryCode: Array<{ text: string; value: any; }> = [
    { text: "Country Code", value: '' },
    { text: "India", value: '+91' },
    { text: "China", value: '+86' },
    { text: "Thailand", value: '+66' },
  ];
  verifyNO() {
    console.log(this.form1.value)
    this.as.SendOtp(this.form1.value).subscribe(res => {
      this.mobileno = this.form1.value.mobile
      console.log(res);
      if (res) {
        this.OTP = res;
        this.isverifyOtp = true;
      }
    })
  }
  createFormGroup() {
    return new FormGroup({
      userId: new FormControl('', Validators.required),
      MobileNo: new FormControl('', Validators.required),
      verifyMobileNo: new FormControl('', Validators.required),
      Password: new FormControl('', Validators.required,),
      NewPassword: new FormControl('', Validators.required,),
      verifyOtp: new FormControl('', Validators.required,),
    });

  }
  ///svc
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  verifyOtp() {
    console.log(this.form1.value)
    if (this.OTP == this.form1.value.verifyOtp) {
      this.isforgetPass = true;
    } else {
      alert('please enter valid OTP')
    }
  }
  gotopage(){
    this.dialogRef.close();
  }
  submitPass() {
    this.spinnerService.show();
    console.log(this.form1.value);
    let payload = {
      "moblieno": this.form1.value.mobile,
      "Password": this.form1.value.Password
    }
    this.as.forgotpassword(payload).subscribe(res => {
      this.spinnerService.hide();

      console.log(res)
      if (res) {
        this.isforgetPass = false;
        Swal.fire({
          icon: 'success',
          title: "Updated Password Done",
          text: "Your Password Changed Succesfully!",
          // type: "success",
          timer: 700
        });
      }
      this.isLoginpage = true;
    })
    this.spinnerService.hide();


  }

  submitForm() {
    this.spinnerService.show();
    this.submitted = true;
    var sub = this.form.value.userId.includes('.com');
    console.log(sub)
    if (sub == true) {
      this.form.value.userId = this.form.value.userId;
    } else {
      // this.form.value.MobileNo = this.form.value.EmailId;
      // this.form.value.EmailId = '';
    }
    console.log(this.form.value);

    this.fms.userLogin(this.form.value).subscribe(res => {
      console.log(res);
      localStorage.setItem('user', JSON.stringify(res));
      this.dialogRef.close(true);
      // Swal.fire('Good job!', 'You clicked the button!', 'success');
      this.spinnerService.hide();
      Swal.fire({
        icon: 'success',
        title: "Logined Succesfully!",
        text: "You clicked the button!",
        // type: "success",
        timer: 700
      });
      localStorage.setItem('user', JSON.stringify(res));
    }, error => {
      this.spinnerService.hide();
      Swal.fire('Error', error.error.message, 'error');
      console.log('oops', error.error);
      //alert(error.error.message)
    })
    //this.createFormGroup();
    console.log(this.form.value);
  }

  ngOnInit(): void {
    this.isLoginpage;
  }

  showForgotPage() {
    this.isLoginpage = !this.isLoginpage;
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  OpenModal() {
    this.dialogRef.close();
    this.matDialogRef = this.matDialog.open(RegisterComponent, {

      disableClose: true,
      'width': "500px",
      'height': "650px"
    });

    this.matDialogRef.afterClosed().subscribe(res => {
      if ((res == true)) {

      }
    });
  }
}
