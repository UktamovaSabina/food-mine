import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart/cart.service';
import { Cart } from '../../shared/models/Cart';
import { CartItem } from '../../shared/models/CartItem';
import { NotFoundComponent } from "../../components/not-found/not-found.component";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css',
  imports: [CommonModule, RouterModule, NotFoundComponent]
})

export class CartPageComponent {

  public cart$!: Observable<Cart>;
  constructor(private cartService: CartService) {
    this.cart$ = this.cartService.getCart();
  }

  removeFromCart(cartItem: CartItem) {
    this.cartService.removeFromCart(cartItem.food.id);
  }

  changeQuantity(cartItem: CartItem, quantityInString: string) {
    const quantity = parseInt(quantityInString);
    this.cartService.changeQuantity(cartItem.food.id, quantity)
  }
}
