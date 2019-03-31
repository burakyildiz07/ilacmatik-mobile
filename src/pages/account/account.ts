import { Component } from '@angular/core';
import { AlertController, LoadingController, Events, IonicPage, NavController, NavParams } from 'ionic-angular';

import { UserServiceProvider } from '../../providers/user-service';

@IonicPage()
@Component({
	selector: 'page-account',
	templateUrl: 'account.html',
})
export class AccountPage {

	user = {};

	constructor(
		public userService: UserServiceProvider,
		public navCtrl: NavController,
		public events: Events,
		public navParams: NavParams,
		private alertCtrl: AlertController,
		private loadingCtrl: LoadingController) {

		this.getUser();
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad AccountPage');
	}

	getUser() {

		let loading = this.loadingCtrl.create({});
		loading.present();

		this.userService.getUser().subscribe(data => {
				this.user = data;
				loading.dismiss();
			},
			error => {
				loading.dismiss();
				console.log(error);
		});
	}

}
