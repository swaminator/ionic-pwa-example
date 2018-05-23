import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/**
 * @description Página acerca de.
 * @author Jhonathan Izquierdo Higuita
 * @export
 * @class AboutPage
 */
@Component({
	selector: 'page-about',
	templateUrl: 'about.html'
})
export class AboutPage {
	/**
	 * Crea una instancia de AboutPage.
	 * @author Jhonathan Izquierdo Higuita
	 * @param {NavController} navCtrl Controladora de navagación entré páginas.
	 * @memberof AboutPage
	 */
	constructor(public navCtrl: NavController) {}

	/**
	 * @description Muestra una notificación en la aplicación.
	 * @author Jhonathan Izquierdo Higuita
	 * @memberof AboutPage
	 */
	showNotification() {
		if (Notification['permission'] == 'granted') {
			navigator.serviceWorker.getRegistration().then(function(registration) {
				var options = {
					body: 'Esta es una notificación de la PWA de Game Of Thrones API.',
					icon: 'assets/imgs/Stark-icon.png',
					vibrate: [100, 50, 100],
					data: { dateOfArrival: Date.now(), primaryKey: 1 }
				};

				registration.showNotification('Winter is coming!!!', options);
			});
		}
	}
}