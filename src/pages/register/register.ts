import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController, LoadingController, Events, IonicPage, NavController, NavParams } from 'ionic-angular';

import { UserServiceProvider } from '../../providers/user-service';

import { HomePage } from '../home/home';

@IonicPage()
@Component({
	selector: 'page-register',
	templateUrl: 'register.html',
})
export class RegisterPage {

	register = { name: '', email: '', password: '' };

	constructor(
		public userService: UserServiceProvider,
		public navCtrl: NavController,
		public events: Events,
		public navParams: NavParams,
		private alertCtrl: AlertController,
		private loadingCtrl: LoadingController) {
	}

	onRegister(form: NgForm) {

		if (form.valid) {

			let loading = this.loadingCtrl.create({});
			loading.present();

			this.userService.register(this.register).subscribe(data => {
					loading.dismiss();
					this.navCtrl.setRoot(HomePage);
				},
				error => {
					loading.dismiss();
					this.showError(error);
			});
			
		}
	}

	showError(error) {
		console.log(error);
		let alert = this.alertCtrl.create({
			title: 'Error',
			// message: error.json().message,
			message: 'Try again',
			buttons: ['OK']
		});
		alert.present();
	}

}
