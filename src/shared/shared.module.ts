import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeftNavbarComponent } from 'src/commonFiles/left-navbar/left-navbar.component';
import { MaterialExampleModule } from 'src/material.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [LeftNavbarComponent],
  imports: [CommonModule, MatProgressSpinnerModule, MaterialExampleModule],
  exports: [
    LeftNavbarComponent,
    MatProgressSpinnerModule,
    NgxSpinnerModule,
    MaterialExampleModule,
  ],
})
export class SharedModule {}
