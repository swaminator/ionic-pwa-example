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
    readonly API_BASE_URL: string = 'https://www.anapioficeandfire.com/api/';

    /**
     * Crea una instancia del servicio.
     * @author Jhonathan Izquierdo Higuita
     * @param {Http} http Objeto http para consultas de api REST.
     * @memberof ApiService
     */
    constructor(private http: Http) { }

    /**
     * @description Obtiene la información de las casas de poniente.
     * @author Jhonathan Izquierdo Higuita
     * @returns {Observable<House[]>} Colección de tipo House.
     * @memberof ApiService
     */
    getHouses(): Observable<House[]> {
        try {

            return this.http.get(this.API_BASE_URL + 'houses')
                .map(this.extractData)
                .catch(this.handleError);
        } catch (error) {
            console.error('Ocurrió un error en el request: ' + this.API_BASE_URL + 'houses');
        }
    }

    /**
     * @description Obtiene de forma páginada los datos de las casas de Poniente.
     * @author Jhonathan Izquierdo Higuita
     * @param {number} page Indica el número de página que se quiere obtener.
     * @param {number} size Indica el tamaño de la página a obtener.
     * @returns {Observable<House[]>} Listado de casas de poniente correspondiente a la página y tamaño indicados.
     * @memberof ApiService
     */
    getHousesPaged(page: number, size: number): Observable<House[]> {
        try {

            return this.http.get(this.API_BASE_URL + 'houses?page=' + page + '&pageSize=' + size)
                .map(this.extractData)
                .catch(this.handleError);
        } catch (error) {
            console.error('Ocurrió un error en el request: ' + this.API_BASE_URL + 'houses');
        }
    }

    /**
     * @description Extrae los valores de la data obtenida de una consulta al api.
     * @author Jhonathan Izquierdo Higuita
     * @param {any} data Datos retornados por el api.
     * @returns Datos en formato JSON.
     * @memberof ApiService
     */
    extractData(data: any) {
        const body = data.json();
        return body || {};
    }

    /**
     * @description Maneja los errores generados al momento de consultar el api.
     * @author Jhonathan Izquierdo Higuita
     * @param {*} error Error generado en la consulta al api.
     * @returns Error relanzado mediante un objeto Observable.
     * @memberof ApiService
     */
    handleError(error: any) {
        return Observable.throw(error);
    }
}
