import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
    selector: 'page-about',
    templateUrl: 'about.html'
})
export class AboutPage {

    constructor(public navCtrl: NavController) { }

    showNotification() {
        if (Notification['permission'] == 'granted') {
            navigator.serviceWorker.getRegistration().then(function (reg) {
                var options = {
                    body: 'Esta es una notificación de la PWA de Game Of Thrones API.',
                    icon: 'assets/imgs/Stark-icon.png',
                    vibrate: [100, 50, 100],
                    data: { dateOfArrival: Date.now(), primaryKey: 1 }
                };

                reg.showNotification('Winter is coming!!!', options);
            });
        }
    }
}
