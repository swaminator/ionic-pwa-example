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
	 * @description Url para la imagen generada por google maps.
	 * @type {string}
	 * @memberof AboutPage
	 */
	mapImgUrl: string = '';

	/**
	 * Crea una instancia de AboutPage.
	 * @author Jhonathan Izquierdo Higuita
	 * @param {NavController} navCtrl Controladora de navagación entré páginas.
	 * @memberof AboutPage
	 */
	constructor(public navCtrl: NavController) { }

	/**
	 * @description Muestra una notificación en la aplicación.
	 * @author Jhonathan Izquierdo Higuita
	 * @memberof AboutPage
	 */
	showNotification() {
		if (Notification['permission'] == 'granted') {
			navigator.serviceWorker.getRegistration().then(function (registration) {
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

	/**
	 * @description Obtiene las coordenadas de localización y muestra una imagen del mapa.
	 * @author Jhonathan Izquierdo Higuita
	 * @memberof AboutPage
	 */
	getLocation() {
		try {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition((position) => {
					let key = 'AIzaSyAaIVF2ThPHOTEipONoFAGlWs9q3J4BpHY';
					var latLon = position.coords.latitude + "," + position.coords.longitude;
					this.mapImgUrl = 'https://maps.googleapis.com/maps/api/staticmap?center='
						+ latLon
						+ '&zoom=16&size=400x400&sensor=false&key='
						+ key
						+ '&markers=color:blue|' + latLon
						+ '&maptype=hybrid';
				});
			} else {
				alert("Geo Location not supported by browser");
			}
		} catch (error) {
			alert(this.locationError(error));
		}
	}

	/**
	 * @description Maneja los errores del api de geolocalización.
	 * @author Jhonathan Izquierdo Higuita
	 * @param {any} error Error capturado.
	 * @returns Texto con el error.
	 * @memberof AboutPage
	 */
	locationError(error) {
		switch (error.code) {
			case error.PERMISSION_DENIED:
				return "User denied the request for Geolocation.";
			case error.POSITION_UNAVAILABLE:
				return "Location information is unavailable.";
			case error.TIMEOUT:
				return "The request to get user location timed out.";
			case error.UNKNOWN_ERROR:
				return "An unknown error occurred.";
		}
	}
}