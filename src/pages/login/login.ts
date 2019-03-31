import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController, LoadingController, Events, IonicPage, NavController, NavParams } from 'ionic-angular';

import { UserOptions } from '../../interfaces/user-options';

import { UserServiceProvider } from '../../providers/user-service';

import { HomePage } from '../home/home';

@IonicPage()
@Component({
	selector: 'page-login',
	templateUrl: 'login.html',
})
export class LoginPage {

	login: UserOptions = { email: '', password: '' };

	constructor(
		public userService: UserServiceProvider,
		public navCtrl: NavController,
		public events: Events,
		public navParams: NavParams,
		private alertCtrl: AlertController,
		private loadingCtrl: LoadingController) {

		// ...
	}

	onLogin(form: NgForm) {

		if (form.valid) {

			let loading = this.loadingCtrl.create({});
			loading.present();

			this.userService.login(this.login).subscribe(data => {
					this.events.publish('user:login');
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
			message: 'Wrong user or password',
			buttons: ['OK']
		});
		alert.present();
	}

}
