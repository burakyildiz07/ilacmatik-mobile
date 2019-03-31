import { Component } from '@angular/core';
import {NavController, IonicPage, LoadingController} from 'ionic-angular';
import {UserServiceProvider} from "../../providers/user-service";
import {LoginPage} from "../login/login";
import {MedicineServiceProvider} from "../../providers/medicine-service";
import {ReminderTimesServiceProvider} from "../../providers/reminder-times-service";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    reminders = {};

    constructor(public navCtrl: NavController,public userService: UserServiceProvider,public medicineService: ReminderTimesServiceProvider,private loadingCtrl: LoadingController,) {


      let loading = this.loadingCtrl.create({});
      loading.present();

      this.userService.hasLoggedIn().then((hasLoggedIn) => {
          if(hasLoggedIn === false)
          {
              this.navCtrl.setRoot(LoginPage);
          }
      });


      this.medicineService.index().subscribe(data => {
              loading.dismiss();

              this.reminders = data;

              console.log(this.reminders );
          },
          error => {
              loading.dismiss();
          });

  }

}
