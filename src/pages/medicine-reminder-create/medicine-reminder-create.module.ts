import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MedicineReminderCreatePage } from './medicine-reminder-create';

@NgModule({
  declarations: [
    MedicineReminderCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(MedicineReminderCreatePage),
  ],
})
export class MedicineReminderCreatePageModule {}
