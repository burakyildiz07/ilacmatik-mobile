import {Component, ViewChild} from '@angular/core';
import {AlertController, DateTime, IonicPage, LoadingController, NavController, NavParams,ToastController} from 'ionic-angular';
import {MedicineOptions} from "../../interfaces/medicine-options";
import {NgForm} from "@angular/forms";
import {MedicineServiceProvider} from "../../providers/medicine-service";

/**
 * Generated class for the MedicineReminderCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-medicine-reminder-create',
  templateUrl: 'medicine-reminder-create.html',
})
export class MedicineReminderCreatePage {

    data: MedicineOptions = { medicine:'', medicineType:'hap',times:[]};

    @ViewChild(DateTime) time:DateTime;


    constructor(
        public medicineService: MedicineServiceProvider,
        public navCtrl: NavController, public navParams: NavParams,
        private alertCtrl: AlertController,
        private loadingCtrl: LoadingController,
        public toastController: ToastController) {


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MedicineReminderCreatePage');

  }

    onPost(form: NgForm) {

        if (form.valid) {

            let loading = this.loadingCtrl.create({});
            loading.present();

            this.medicineService.create(this.data).subscribe(data => {
                    loading.dismiss();

                    console.log(data);
                },
                error => {
                    loading.dismiss();
                    this.showError(error);
                });
        }
    }

    showError(error) {
        console.log(error);
        /*
        let alert = this.alertCtrl.create({
            title: 'Error',
            // message: error.json().message,
            message: 'Wrong user or password',
            buttons: ['OK']
        });
        alert.present();*/
        this.presentToastWithOptions();
    }

    async presentToastWithOptions() {
        const toast = await this.toastController.create({
            message: 'Click to Close',
            showCloseButton: true,
            position: 'top',
            closeButtonText: 'Done',
            cssClass: "toast-success"

        });
        toast.present();
    }

    timeChanged(event)
    {
        this.data.times.push(event.hour+":"+event.minute);

        console.log(this.data);
    }

    addTime()
    {
        this.time.open();
    }

    removeTime(i)
    {
        this.data.times.splice(i,1);
    }

}
