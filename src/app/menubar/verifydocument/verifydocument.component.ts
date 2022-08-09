import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FmsService } from 'src/app/services/fms.service';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-verifydocument',
  templateUrl: './verifydocument.component.html',
  styleUrls: ['./verifydocument.component.scss']
})
export class VerifydocumentComponent implements OnInit {
  userID: any;
  message: string[] = [];
  progressInfos: any[] = [];

  previews: string[] = [];
  profilePic: any;
  breedLst: any;
  selectedFiles3: any;
  selectedFiles2: any;
  selectedFiles1: any;
  breeddialogRef: any;
  constructor(private fms: FmsService,private as: AuthService) { 
    const userDetails = this.as.getLoggedUserDetails();
    this.userID = userDetails.userId;
  }

  ngOnInit(): void {
  }
  onFileSelect(event: any, i: number) {

    this.message = [];
    this.progressInfos = [];
    if (i == 1) {

      this.selectedFiles1 = event.target.files;
    }
    if (i == 2) {

      this.selectedFiles2 = event.target.files;
    }
    if (i == 3) {

      this.selectedFiles3 = event.target.files;
    }
    console.log(this.selectedFiles1)
    this.previews = [];

    // if (this.selectedFiles && this.selectedFiles[0]) {
    //   const numberOfFiles = this.selectedFiles.length;
    //   for (let i = 0; i < numberOfFiles; i++) {
    //     const reader = new FileReader();

    //     reader.onload = (e: any) => {
    //       this.previews.push(e.target.result);
    //       console.log(this.previews)
    //     };

    //     reader.readAsDataURL(this.selectedFiles[i]);
    //   }
    // }
  }

  verifyUpload() {
    var formdata = new FormData();
    formdata.append("Document1", this.selectedFiles1[0]);
    formdata.append("Document2", this.selectedFiles2[0]);
    formdata.append("Document3", this.selectedFiles3[0]);
    formdata.append("MemberType", "123");
    formdata.append("UserID", this.userID);
    formdata.append("Isverified", "true");
    formdata.append("Document1FileName", "test1");
    formdata.append("Document2FileName", "test2");
    formdata.append("Document3FileName", "test3");
    //console.log(formdata)
    this.fms.verifyUpload(formdata).subscribe(res => { console.log(res);
    if(res){
      Swal.fire({
        title: 'Documents Uploaded Successfully',
        icon: 'success',
       // text: ' you want to delete the Order, this action cannot be undone',
        // showCancelButton: true,
        // confirmButtonText: 'Yes, go ahead.',
        // cancelButtonText: 'No, let me think'
      })
    } })
    //Documents Uploaded Successfully
  }


}
