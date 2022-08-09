import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit {
  form: FormGroup;

  constructor(private readonly fb: FormBuilder, public dialogRef: MatDialogRef<ChangepasswordComponent>, private as: AuthService) {
    this.form = this.fb.group({



      password: new FormControl('', Validators.compose([
        Validators.required,

      ])),
      newPassword: new FormControl('', Validators.compose([
        Validators.required,

      ])),
      // confirmPassword: new FormControl('', Validators.compose([
      //   Validators.required,

      // ])),
    },
      {
        validators: this.Password.bind(this)
      });


  }
  /////this is not used 
  Password(formGroup: FormGroup) {
    const Password = formGroup.get('Password');
    const confirmPassword = formGroup.get('confirmPassword');
    return Password === confirmPassword ? null : { passwordNotMatch: true };
  }

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  submitForm() {
    
    console.log(this.form.value);
    this.as.passwordChange(this.form.value).subscribe(res => {
      console.log(res);
      if (res) {
        this.dialogRef.close();
      }
    })
  }

}
function ConfirmPasswordValidator(arg0: string, arg1: string): any {
  throw new Error('Function not implemented.');
}

