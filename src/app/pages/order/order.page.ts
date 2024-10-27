import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItemDetails, CartService } from 'src/app/services/cart/cart.service';
import { DrinkSizes, DrinksService } from 'src/app/services/drinks/drinks.service';

@Component({
	selector: 'app-order',
	templateUrl: './order.page.html',
	styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {
	public drink: any;
	public drinkSizesPrices: [string, number][] = [];
	// public drinkSize: string = "";
	// public drinkPrice: number = 0.00;

	public drinkItemDetails: CartItemDetails = {
		id: 0,
		name: "",
		category: "",
		size: "",
		price: 0
	}

	constructor( 
		private route: ActivatedRoute, 
		private drinksService: DrinksService,
		private cartService: CartService
	) { }

	ngOnInit() {
		// Get the Specified Drink Information based on its ID.
		const drinkId = Number(this.route.snapshot.paramMap.get('id'));
		this.drink = this.drinksService.GetDrinkById(drinkId);

		// Make it easier to retrieve the Drink Size and Price.
		this.drinkSizesPrices = this.drinksService.GetDrinkSizesPrices(this.drink);

		// Fill in the Drink Details to the CartItemDetails.
		this.drinkItemDetails.id = this.drink.id;
		this.drinkItemDetails.name = this.drink.name;
		this.drinkItemDetails.category = this.drink.categories;
		this.drinkItemDetails.size = this.drinkSizesPrices[0][0];
		this.drinkItemDetails.price = this.drinkSizesPrices[0][1];
	}

	public DrinkSizes() {
		const drinkSizesPrices: [string, number][] = this.drinksService.GetDrinkSizesPrices(this.drink);
		for (const drinkSizePrice of drinkSizesPrices) {
			console.log(drinkSizePrice);
		}
	}

	public SetDrinkSizePrice(drinkSize: any) {
		this.drinkItemDetails.size = drinkSize.detail.value;

		const selectedSizePrice = this.drinkSizesPrices.find(
			([size, price]) => size === this.drinkItemDetails.size
		);

		this.drinkItemDetails.price = selectedSizePrice ? selectedSizePrice[1] : this.drinkItemDetails.price;
	}

	public AddToCart() {
		this.cartService.AddToCart(this.drinkItemDetails);
	}
}
