import { Component, ViewChild } from '@angular/core';
import { Events, MenuController, Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
// import { ListPage } from '../pages/list/list';

import { AccountPage } from '../pages/account/account';
import { OtherPage } from '../pages/other/other';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';

import { UserServiceProvider } from '../providers/user-service';
import {MedicineReminderCreatePage} from "../pages/medicine-reminder-create/medicine-reminder-create";

export interface PageInterface {
  title: string;
  name: string;
  component: any;
  icon?: string;
  logsOut?: boolean;
  index?: number;
  tabName?: string;
  tabComponent?: any;
}

@Component({
    templateUrl: 'app.html'
})
export class PassportApp {
    @ViewChild(Nav) nav: Nav;

    appPages: PageInterface[] = [

    ];
    loggedInPages: PageInterface[] = [
        { title: 'Anasayfa', name: 'HomePage', component: HomePage},
        { title: 'Hatırlatıcı Ekle', name: 'MedicineReminderCreatePage', component: MedicineReminderCreatePage},
        { title: 'Hesap', name: 'AccountPage', component: AccountPage},
        { title: 'Çıkış', name: 'HomePage', component: HomePage, logsOut: true }
    ];
    loggedOutPages: PageInterface[] = [
        { title: 'Giriş Yap', name: 'LoginPage', component: LoginPage},
        { title: 'Üye Ol', name: 'RegisterPage', component: RegisterPage}
    ];

    rootPage: any = HomePage;

    constructor(
        public events: Events,
        public userService: UserServiceProvider,
        public menu: MenuController,
        public platform: Platform,
        public statusBar: StatusBar,
        public splashScreen: SplashScreen) {

        this.initializeApp();

        // decide which menu items should be hidden by current login status stored in local storage
        this.userService.hasLoggedIn().then((hasLoggedIn) => {
            this.enableMenu(hasLoggedIn === true);
        });
        this.enableMenu(true);

        this.listenToLoginEvents();

    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    openPage(page) {
        let params = {};

        // the nav component was found using @ViewChild(Nav)
        // setRoot on the nav to remove previous pages and only have this page
        // we wouldn't want the back button to show in this scenario
        if (page.index) {
        params = { tabIndex: page.index };
        }

        // If we are already on tabs just change the selected tab
        // don't setRoot again, this maintains the history stack of the
        // tabs even if changing them from the menu
        if (this.nav.getActiveChildNavs().length && page.index != undefined) {
        this.nav.getActiveChildNavs()[0].select(page.index);
        } else {
        // Set the root of the nav with params if it's a tab index
        this.nav.setRoot(page.name, params).catch((err: any) => {
        console.log(`Didn't set nav root: ${err}`);
        });
        }

        if (page.logsOut === true) {
        // Give the menu time to close before changing to logged out
        this.userService.logout();
        }
    }

    listenToLoginEvents() {
        this.events.subscribe('user:login', () => {
            this.enableMenu(true);
        });

        this.events.subscribe('user:signup', () => {
            this.enableMenu(true);
        });

        this.events.subscribe('user:logout', () => {
            this.enableMenu(false);
        });
    }

    enableMenu(loggedIn: boolean) {
        this.menu.enable(loggedIn, 'loggedInMenu');
        this.menu.enable(!loggedIn, 'loggedOutMenu');
    }
}
