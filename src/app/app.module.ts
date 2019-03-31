import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { IonicStorageModule, Storage } from '@ionic/storage';

import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../interceptors/token-interceptor';

import { PassportApp } from './app.component';
import { ListPage } from '../pages/list/list';

import { HomePageModule } from '../pages/home/home.module';
import { OtherPageModule } from '../pages/other/other.module';
import { LoginPageModule } from '../pages/login/login.module';
import { RegisterPageModule } from '../pages/register/register.module';
import { AccountPageModule } from '../pages/account/account.module';
import { MedicineReminderCreatePageModule } from '../pages/medicine-reminder-create/medicine-reminder-create.module';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { GlobalServiceProvider } from '../providers/global-service';
import { PassportServiceProvider } from '../providers/passport-service';
import { UserServiceProvider } from '../providers/user-service';
import { MedicineServiceProvider } from '../providers/medicine-service';
import { ReminderTimesServiceProvider } from '../providers/reminder-times-service';

@NgModule({
    declarations: [
        PassportApp,
        ListPage
    ],
    imports: [
        BrowserModule,
        HttpModule,
        HttpClientModule,
        IonicModule.forRoot(PassportApp),
        IonicStorageModule.forRoot({
            name: '__appDB'
        }),
        HomePageModule,
        OtherPageModule,
        LoginPageModule,
        RegisterPageModule,
        AccountPageModule,
        MedicineReminderCreatePageModule
    ],
    bootstrap: [IonicApp],
        entryComponents: [
        PassportApp,
        ListPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        GlobalServiceProvider,
        PassportServiceProvider,
        UserServiceProvider,
        MedicineServiceProvider,
        ReminderTimesServiceProvider,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        }
    ]
})
export class AppModule {}
