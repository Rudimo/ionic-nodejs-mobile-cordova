import {Component} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';

declare const nodejs: any;

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    constructor(public navCtrl: NavController,
                private platform: Platform) {

        this.init();
    }

    private init() {

        if (this.platform.is('cordova')) {

            nodejs.channel.setListener((log) => {

                log = JSON.parse(log);

                if (log.type === 'error') {
                    console.error("[cordova]:" + log.msg);
                } else {
                    console.log("[cordova]:" + log.msg);
                }
            });

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

    public connect() {

        nodejs.channel.send('connect');
    }
}
