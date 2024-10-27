import { Component } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { map, Observable } from 'rxjs';
import { CartItem, CartItemDetails, CartService } from 'src/app/services/cart/cart.service';

@Component({
	selector: 'app-tab2',
	templateUrl: 'tab2.page.html',
	styleUrls: ['tab2.page.scss']
})

export class Tab2Page {
	public cartItems$: Observable<CartItem[]> = this.cartService.cart$;
	public totalPrice$: Observable<number> = this.cartService.cart$.pipe(map(() => this.cartService.GetTotalPrice()));

	// The Coffee and Tea Carts, for Categorisation.
	public cartCoffees$: Observable<CartItem[]> = this.cartService.cartCoffees$;
	public cartTeas$: Observable<CartItem[]> = this.cartService.cartTeas$;

	constructor(private cartService: CartService, private alertController: AlertController) {}

	public IncreaseCartItemQuantity(itemDetails: CartItemDetails) {
		this.cartService.AddToCart(itemDetails);
	}

	public DecreaseCartItemQuantity(itemDetails: CartItemDetails) {
		this.cartService.RemoveFromCart(itemDetails);
	}

	public GetCartItemPrice(item: CartItem): number {
		return item.cartItemDetails.price * item.quantity;
	}

	// Empty the Cart and Alert the User that they've submitted the items.
	public async Checkout() {
		let alertText: string = "";

		if (this.cartService.GetCartCount() > 0) {
			alertText = "Thank you for your order! 😊";
			this.cartService.ClearCart();

			/** Put code for successful transaction. */
			
		} else {
			alertText = "Your cart is empty, you should order something!";
		}

		const alert = await this.alertController.create({
			header: alertText,
			buttons: ['Confirm'],
		});

		await alert.present();
	}
}