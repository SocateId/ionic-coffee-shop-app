import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})

export class CartService {
	private cart: BehaviorSubject<CartItem[]> = new BehaviorSubject<CartItem[]>([]);
	cart$ = this.cart.asObservable();

	// For Coffee and Tea Category.
	private cartCoffees: BehaviorSubject<CartItem[]> = new BehaviorSubject<CartItem[]>([]);
	cartCoffees$ = this.cartCoffees.asObservable();
	private cartTeas: BehaviorSubject<CartItem[]> = new BehaviorSubject<CartItem[]>([]);
	cartTeas$ = this.cartTeas.asObservable();

	constructor() { }

	public AddToCart(itemDetails: CartItemDetails) {
		let currentCart: CartItem[] = this.cart.getValue();
		// Check if a Similar Item has already been added.
		const index: number = currentCart.findIndex(
			item => (item.cartItemDetails.id === itemDetails.id) && (item.cartItemDetails.size === itemDetails.size)
		);

		// If a Similar Item does already exist in the cart ...
		if (index !== -1) {
			// Increase its quantity.
			currentCart[index].quantity++;

		} else {
			// Otherwise, append it to the cart.
			const newCartItem: CartItem = {
				cartItemDetails: itemDetails,
				quantity: 1
			}
			currentCart = [...currentCart, newCartItem];
		}

		console.log(currentCart);

		this.cart.next(currentCart);
		// Update the Coffee and Teas Array.
		this.UpdateCategoryArrays(currentCart);
	}

	public RemoveFromCart(itemDetails: CartItemDetails) {
		let currentCart: CartItem[] = this.cart.getValue();
		// Check if the specified Item exist.
		const index: number = currentCart.findIndex(
			item => (item.cartItemDetails.id === itemDetails.id) && (item.cartItemDetails.size === itemDetails.size)
		);

		// If the item exist in the cart ...
		if (index !== -1) {
			currentCart[index].quantity--;

			// Remove the CartItem completely from Cart if its quantity is 0.
			if (currentCart[index].quantity <= 0) {
				currentCart.splice(index, 1);
			}

			console.log(currentCart);

			this.cart.next(currentCart);
			// Update the Coffee and Teas Array.
			this.UpdateCategoryArrays(currentCart);
		}
	}

	public GetTotalPrice(): number {
		return this.cart.getValue().reduce((total, item) => 
			total + (item.cartItemDetails.price || 0) * item.quantity
		, 0);
	}

	public GetCartCount(): number {
		const currentCart: CartItem[] = this.cart.getValue();

		return currentCart.length;
	}

	// Update the Coffee and Tea Arrays.
	private UpdateCategoryArrays(currentCart: CartItem[]) {
		const itemCoffees = currentCart.filter(item => item.cartItemDetails.category === 'coffee');
		const itemTeas = currentCart.filter(item => item.cartItemDetails.category === 'tea');

		this.cartCoffees.next(itemCoffees);
		this.cartTeas.next(itemTeas);
	}

	public ClearCart() {
		this.cart.next([]);
		this.cartCoffees.next([]);
		this.cartTeas.next([]);
	}
}

// Cart Items.
export interface CartItem {
	cartItemDetails: CartItemDetails;
	quantity: number;
}

// The details of the individual Cart Item.
export interface CartItemDetails {
	id: number;
	name: string;
	category: string;
	size: string;
	price: number;
}