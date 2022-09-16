import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-vediolist',
  templateUrl: './vediolist.component.html',
  styleUrls: ['./vediolist.component.scss']
})
export class VediolistComponent implements OnInit {
  vedios: any;
  productvideoUrl = environment.videoUrl;
  constructor(public dialogRef: MatDialogRef<VediolistComponent>) { 
    this.vedios = JSON.parse(localStorage.getItem('smallvedio') || '{}');
    console.log(this.vedios)
  }

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
