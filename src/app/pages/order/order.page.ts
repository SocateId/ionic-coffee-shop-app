import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DrinksService } from 'src/app/services/drinks/drinks.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {
  public drink: any;

  constructor( private route: ActivatedRoute, private drinksService: DrinksService) { }

  ngOnInit() {
    const drinkId = Number(this.route.snapshot.paramMap.get('id'));
    this.drink = this.drinksService.GetDrinkById(drinkId);
  }

}
