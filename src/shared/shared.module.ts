import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeftNavbarComponent } from 'src/commonFiles/left-navbar/left-navbar.component';
import { MaterialExampleModule } from 'src/material.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [LeftNavbarComponent],
  imports: [CommonModule, MatProgressSpinnerModule, MaterialExampleModule,MatDialogModule],
  exports: [
    LeftNavbarComponent,
    MatProgressSpinnerModule,
    NgxSpinnerModule,
    MaterialExampleModule,
    TranslateModule,
  ],
})
export class SharedModule {}
