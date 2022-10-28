import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth.service';
import { FmsService } from 'src/app/services/fms.service';
import { LoginService } from 'src/app/services/login.service';
import { Member } from 'src/commonFiles/register/register.model';
import Swal from 'sweetalert2';
import { ChangepasswordComponent } from '../changepassword/changepassword.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  forms: any = new Member;
  userID: any;
  progressInfos: any[] = [];
  message: string[] = [];
  profilePic: any;
  imageUrl: any;
  matDialogRef!: MatDialogRef<ChangepasswordComponent>;
  profileImage!: string  ;
  selectedlng:string='en';
   
  constructor(private fms: FmsService, private as: AuthService, public spinnerService: NgxSpinnerService, private gs: LoginService,private router: Router,private matDialog: MatDialog,) {
    const userDetails = this.as.getLoggedUserDetails();
    this.userID = userDetails.userId;
    this.selectedlng='th';
    const data=localStorage.getItem('lng');
    if(data != null){
      this.selectedlng=data;
    } 

   }

  ngOnInit(): void {
    this.getProfile();
  }

  onImageFileSelect(e: any) {
    this.message = [];
    this.progressInfos = [];
    const selectedFiles = e.target.files;

    if (selectedFiles && selectedFiles[0]) {
      this.profilePic = selectedFiles[0];
      var reader=new FileReader();
      reader.onload = (event: any) => {
        this.imageUrl = event.target.result;
      }
      reader.readAsDataURL(selectedFiles[0]);
     
      console.log(this.profileImage)
    }

  }
  getProfile() {


    this.gs.memberListbyId(this.userID).subscribe(res => {
     //// console.log(res);

      this.forms = res;
      localStorage.setItem('user', JSON.stringify(res));
      this.profileImage=this.forms.profilePhoto;
    })
  }
  openModal(){
    this.matDialogRef = this.matDialog.open(ChangepasswordComponent, {
     // data: { name: this.name },
      disableClose: true,
      'width': "400px",
      'height': "340px"
    });

    this.matDialogRef.afterClosed().subscribe(res => {
      if ((res == true)) {
       // this.name = "";
      //  this.showlist = false;
        //later handle
      }
    });

  }
  onSubmit() {
   //// console.log(this.forms)
   this.spinnerService.show();

    const formData = new FormData();
    formData.append("UserId", this.userID);
    formData.append("userName", this.forms.userName);
    formData.append("password", this.forms.password);
    formData.append("firstName", this.forms.firstName);
    formData.append("lastName", this.forms.lastName);
    formData.append("emailId", this.forms.emailId);
    formData.append("memberType", this.forms.memberType);
    formData.append("mobileNo", this.forms.mobileNo);
    formData.append("IsActive", "true");
    formData.append("CreatedOn", "2018-12-18T05:05:14.914Z");
    formData.append("AboutUs", this.forms.aboutUs);
    formData.append("Website", this.forms.website);
    formData.append("ProfilePhoto", this.profileImage);
    formData.append("IsAcceptedTermsConditions", "false");
    formData.append("FileName", this.profilePic);
    this.gs.userRegisterUpdate(formData).subscribe(res => {
     //// console.log(res)
      if (res) {
   this.spinnerService.hide();

        Swal.fire({
          icon: 'success',
          title: "Profile Updated Succesfully!",
          // text: "You clicked the button!",
          // type: "success",
          timer: 500
        });

        this.getProfile();
      }

    })
    ////// console.log(this.adform)
    // this.fms.saveaddress(this.adform).subscribe(res => {
    //   this.address = res;
    //  //// console.log(this.address)
    // })
  }
  public listItemskeys: Array<{ text: string; value: any; }> = [
    { text: "Please Select", value: null },
    { text: "Farm", value: 2171 },
    { text: "Transport", value: 2172 },
    { text: "Shop", value: 2173 },
  ];
}
