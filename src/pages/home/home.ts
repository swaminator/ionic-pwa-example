import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { ApiService } from '../../services/apiservice';
import { House } from '../../models/house';

/**
 * @description Componente página de inicio.
 * @author Jhonathan Izquierdo Higuita
 * @class HomePage
 * @implements {OnInit}
 */
@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage implements OnInit {
	/**
	 * @description Listado de casas de GoT.
	 * @type {House[]}
	 * @memberof HomePage
	 */
	westerosHouses: House[] = [];

	/**
	 * @description Página actual.
	 * @type {number}
	 * @memberof HomePage
	 */
	page: number = 1;

	/**
	 * @description Crea una instancia del componente.
	 * @author Jhonathan Izquierdo Higuita
	 * @param {NavController} navCtrl
	 * @param {AlertController} alertCtrl
	 * @param {ApiService} apiSvc
	 * @memberof HomePage
	 */
	constructor(
		public navCtrl: NavController,
		private alertCtrl: AlertController,
		public apiSvc: ApiService
	) {}

	/**
	 * @description Evento del componente al inicializar.
	 * @author Jhonathan Izquierdo Higuita
	 * @memberof HomePage
	 */
	ngOnInit() {
		if (!navigator.onLine) {
			let alert = this.alertCtrl.create({
				title: 'Trabajando Offline',
				subTitle: 'No hay red de datos disponible.',
				buttons: ['Cerrar']
			});

			alert.present();
		}

		this.getAllHouses();
		if ('Notification' in window) {
			console.log('Api de notificaciones disponible, registrando cliente...');
			Notification.requestPermission((status: any) => {
				console.log('Estado de permisos para notificaciones push: ', status);
			});
		} else {
			alert('No está disponible el api de notificaciones.');
		}
	}

	/**
	 * @description Obtiene la información de las casas de poniente.
	 * @author Jhonathan Izquierdo Higuita
	 * @memberof HomePage
	 */
	getAllHouses() {
		this.apiSvc.getHousesPaged(1, 10).subscribe(
			(housesData: House[]) => {
				this.westerosHouses = housesData;
			},
			(error: any) => {
				console.log('Error en el método: getHouses.');
			}
		);
	}

	/**
	 * @description
	 * @author Jhonathan Izquierdo Higuita
	 * @param {any} infiniteScroll
	 * @memberof HomePage
	 */
	doInfinite(infiniteScroll: any) {
		this.page = this.page + 1;
		setTimeout(() => {
			this.apiSvc.getHousesPaged(this.page, 10).subscribe(
				(housesData: House[]) => {
					housesData.forEach(house => {
						this.westerosHouses.push(house);
					});

					infiniteScroll.complete();
				},
				(error: any) => {
					infiniteScroll.complete();
					if (!navigator.onLine) {
						let alert = this.alertCtrl.create({
							title: 'Error Cargando Datos',
							subTitle: `No hay más datos guardados en caché.`,
							buttons: ['Cerrar']
						});

						alert.present();
					} else {
						let alert = this.alertCtrl.create({
							title: 'Aplicación Offline',
							subTitle: `No se pudieron obtener más datos.`,
							buttons: ['Cerrar']
						});

						alert.present();
					}
				}
			);
		}, 500);
	}
}
