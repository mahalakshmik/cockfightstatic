import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransportbookingListComponent } from './transportbooking-list/transportbooking-list.component';
import { TransporterListComponent } from './transporter-list/transporter-list.component';

const routes: Routes = [
  
   
      {path:':id',component:TransporterListComponent},
      {
        path:'bookinglist', component: TransportbookingListComponent},
     
      
    
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransportRoutingModule { }
