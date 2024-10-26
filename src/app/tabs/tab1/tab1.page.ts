import { Component, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { Drink, DrinksService } from 'src/app/services/drinks/drinks.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-tab1',
	templateUrl: 'tab1.page.html',
	styleUrls: ['tab1.page.scss']
})

export class Tab1Page {
	@ViewChild(IonContent, { static: false }) content: IonContent | undefined;

	constructor(public drinksService: DrinksService, private router: Router) {}

	// On Load.
	async ngOnInit() {
		await this.drinksService.LoadDrinks();
	}

	// Go to specified drink OrderPage.
	public GoToOrderPage(drinkId: number) {
		this.router.navigate(['/order', drinkId]);
	}

	// Get the initial price, the smallest size, of the specified Drink.
	public GetInitialDrinkPrice(drink: Drink): number {
		return Object.values(drink.sizes[0])[0];
	}

	public ScrollTo(category: string) {
		const categoryElement = document.getElementById(category);
		const mainContent = document.querySelector('.main-content');

		if (categoryElement) {
			const yOffset = categoryElement.offsetTop  - mainContent!.getBoundingClientRect().top;
			
			mainContent!.scrollTo({
				top: yOffset,
				behavior: 'smooth'
			});
		}
	}
}
