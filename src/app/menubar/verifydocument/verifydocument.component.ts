import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth.service';
import { FmsService } from 'src/app/services/fms.service';
import { LoginService } from 'src/app/services/login.service';
import { environment } from 'src/environments/environment';
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
  selectedFiles3: any=null;
  selectedFiles2: any=null;
  selectedFiles1: any=null;
  priviewfile1: any;
  priviewfile2: any;
  priviewfile3: any;
  breeddialogRef: any;
  productPicUrl=environment.documentUrl;
  isNew: boolean=true;
  filename1: string="";
  filename2: string="";
  filename3: string="";
  constructor(private fms: FmsService,private as: AuthService, public spinnerService: NgxSpinnerService,) { 
    const userDetails = this.as.getLoggedUserDetails();
    this.userID = userDetails.userId;
  }

  ngOnInit(): void {
    this.getfiles();
  }
  getfiles(){
    this.fms.getdocuments().subscribe((res:any)=>{
      console.log(res)
      if(res.length !=0){debugger
       
        this.priviewfile1=this.productPicUrl+res[0].userId+'/'+res[0].document1;
        this.priviewfile2=this.productPicUrl+res[0].userId+'/'+res[0].document2;
        this.priviewfile3=this.productPicUrl+res[0].userId+'/'+res[0].document3;
        this.isNew=res.length !=0 ? false:true;
        this.filename1=res[0].document1;
        this.filename2=res[0].document2;
        this.filename3=res[0].document3;
        alert(this.isNew)
      }

      // const imgs = this.productPicUrl + e.imageName;
      // this.previews.push(imgs)
    })
  }
  onFileSelect(event: any, i: number) {

    this.message = [];
    this.progressInfos = [];
    let reader = new FileReader();
    switch (i) {
      case 1:
        
     this.selectedFiles1 = event.target.files[0];
     this.filename1=this.selectedFiles1.name;
        reader.onload = (e: any) => {
                this.priviewfile1=e.target.result;
              };      
        reader.readAsDataURL(event.target.files[0]);
        break;
      case 2:
        this.selectedFiles2 = event.target.files[0];
     this.filename2=this.selectedFiles2.name;
        reader.onload = (e: any) => {
                this.priviewfile2=e.target.result;
              };      
        reader.readAsDataURL(event.target.files[0]);
        break;
        case 3:
          this.selectedFiles3 = event.target.files[0];
     this.filename3=this.selectedFiles3.name;
          reader.onload = (e: any) => {
                  this.priviewfile3=e.target.result;
                };      
          reader.readAsDataURL(event.target.files[0]);
        
        break;
    
      default:
        break;
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
    this.spinnerService.show();
    if(this.isNew){

      if(this.selectedFiles1 ==null || this.selectedFiles2==null || this.selectedFiles3==null){
        alert('please upload files')
        this.spinnerService.hide();
        return;
      }

    }
    var formdata = new FormData();
    formdata.append("Document1", this.selectedFiles1);
    formdata.append("Document2", this.selectedFiles2);
    formdata.append("Document3", this.selectedFiles3);
    formdata.append("MemberType", "123");
    formdata.append("UserID", this.userID);
    formdata.append("Isverified", "true");
    formdata.append("Document1FileName", this.filename1);
    formdata.append("Document2FileName", this.filename2);
    formdata.append("Document3FileName", this.filename3);
    //console.log(formdata)
    this.fms.verifyUpload(formdata).subscribe(
      res => { console.log(res);
      this.spinnerService.hide();
    if(res){

      Swal.fire({
        title: 'Documents Uploaded Successfully',
        icon: 'success',
        timer:700
     
      })
    } 
  },
  err=>{
    console.log(err)
    this.spinnerService.hide();
   Swal.fire({
    title: err.error.text,
    icon: 'success',
 
  })
  }
  );
  
  
    //Documents Uploaded Successfully
  }


}
