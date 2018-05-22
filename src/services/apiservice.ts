import { Injectable } from "@angular/core";
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { House } from "../models/house";

/**
 * @description Servicio que consulta la api de GoT.
 * @author Jhonathan Izquierdo Higuita
 * @export
 * @class ApiService
 */
@Injectable()
export class ApiService {

    /**
     * @description Ruta base del api.
     * @type {string}
     * @memberof ApiService
     */
    readonly baseApi: string = 'https://www.anapioficeandfire.com/api/';

    /**
     * Crea una instancia del servicio.
     * @author Jhonathan Izquierdo Higuita
     * @param {Http} http
     * @memberof ApiService
     */
    constructor(private http: Http) { }

    /**
     * @description Obtiene la información de las casas de poniente.
     * @author Jhonathan Izquierdo Higuita
     * @returns {Observable<House[]>}
     * @memberof ApiService
     */
    getHouses(): Observable<House[]> {
        try {

            return this.http.get(this.baseApi + 'houses')
                .map(this.extractData)
                .catch(this.handleError);
        } catch (error) {
            console.error('Ocurrió un error en el request: ' + this.baseApi + 'houses');
        }
    }

    getHousesPaged(page: number, size: number): Observable<House[]> {
        try {

            return this.http.get(this.baseApi + 'houses?page=' + page + '&pageSize=' + size)
                .map(this.extractData)
                .catch(this.handleError);
        } catch (error) {
            console.error('Ocurrió un error en el request: ' + this.baseApi + 'houses');
        }
    }

    extractData(value: any) {
        const body = value.json();
        return body || {};
    }

    handleError(error: any) {
        return Observable.throw(error);
    }
}
