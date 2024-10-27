import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})

export class DrinksService {

	public drinks: Drink[] = [];
	public coffees: Drink[] = [];
	public teas: Drink[] = [];

	constructor(private http: HttpClient) { }

	// Retrieve the Drink Data from the JSON file,
	// and Load the data into the Drinks array.
	public LoadDrinks() {
		this.http.get<{[key: string]: Drink}>('./assets/drinks-data.json').subscribe({
			next: (data) => {
				// Convert the object to an array of drinks.
				this.drinks = Object.values(data);

				// Loads drinks into respective categories.
				this.LoadCoffees();
				this.LoadTeas();
			},
			error: (error) => {
				console.error('Error fetching drinks-data', error);
			}
		});
	}
	
	public LoadCoffees() {
		this.coffees = this.drinks.filter(drink => drink.categories === 'coffee');
	}

	
	public LoadTeas() {
		this.teas = this.drinks.filter(drink => drink.categories === 'tea');
	}

	// Returns the Drink data specified by its ID.
	public GetDrinkById(drinkId: number): Drink | undefined {
		return this.drinks.find(drink => drink.id === drinkId);
	}

	// Returns a 2D Array of the Drink Sizes and Prices in format [Size, Price][].
	public GetDrinkSizesPrices(drink: Drink): [string, number][] {
		let drinkSizesPrices: [string, number][] = [];

		for (const drinkSizePrice of drink.sizes) {
			drinkSizesPrices.push([Object.keys(drinkSizePrice)[0], Object.values(drinkSizePrice)[0]]);
		}

		return drinkSizesPrices;
	}
}

export interface Drink {
	id: number,
	name: string,
	categories: string,
	sizes: DrinkSizes[],
	image: string
}

export interface DrinkSizes {
	[sizeName: string]: number;
}