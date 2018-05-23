/**
 * @description Describe los datos de una casa noble de Poniente.
 * @author Jhonathan Izquierdo Higuita
 * @export
 * @class House
 */
export class House {
	/**
	 * @description Indica el nombre de la casa.
	 * @type {string}
	 * @memberof House
	 */
	name: string;

	/**
	 * @description Indica la región en donde se ubica el feudo que guarda la casa.
	 * @type {string}
	 * @memberof House
	 */
	region: string;

	/**
	 * @description Indica las palabras / lema de la casa.
	 * @type {string}
	 * @memberof House
	 */
	words: string;

	/**
	 * @description Indica los títulos nobiliarios obtenidos por el Lord de la casa.
	 * @type {string[]}
	 * @memberof House
	 */
	titles: string[];
}
