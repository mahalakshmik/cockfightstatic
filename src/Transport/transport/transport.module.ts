import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransportRoutingModule } from './transport-routing.module';
import { BooktransportComponent } from './booktransport/booktransport.component';
import { TransportdetailsComponent } from './transportdetails/transportdetails.component';
import { TransportbookingListComponent } from './transportbooking-list/transportbooking-list.component';
import { TransportbookingsComponent } from './transportbookings/transportbookings.component';
import { TransporterFormComponent } from './transporter-form/transporter-form.component';
import { TransporterListComponent } from './transporter-list/transporter-list.component';

@NgModule({
  declarations: [
    BooktransportComponent,
    TransportdetailsComponent,
    TransportbookingListComponent,
    TransportbookingsComponent,
    TransporterFormComponent,
    TransporterListComponent
  ],
  imports: [
    CommonModule,
    TransportRoutingModule
  ]
})
export class TransportModule { }
