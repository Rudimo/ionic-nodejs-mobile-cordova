import {Component} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import { Storage } from '@ionic/storage';

declare const cordova: any;
declare const nodejs: any;

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    constructor(public navCtrl: NavController,
                private platform: Platform,
                private storage: Storage) {

        this.init();
    }

    private init() {

        this.storage.set('age', '90').then(() => {
            console.log('Storage set success');
        });

        this.storage.get('age').then((val) => {
            console.log('Your age is', val);
        });

        if (this.platform.is('cordova')) {

            // Bootstrap NodeJS App
            nodejs.start('index.js', (err) => {
                if (err) {
                    console.error(err);
                } else {
                    console.info('NodeJS Engine Started');
                }
            });
        }
    }
}
