import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from '../../shared/models/Cart';
import { CartItem } from '../../shared/models/CartItem';
import { Food } from '../../shared/models/Food';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private storeCart$$: BehaviorSubject<Cart> = new BehaviorSubject<Cart>(new Cart());
  public readonly cart$: Observable<Cart> = this.storeCart$$.asObservable();


  addToCart(food: Food): void {
    const cart = this.storeCart$$.value;
    let cartItem = cart.items.find(item => item.food.id === food.id);
    if (cartItem) {
      this.changeQuantity(food.id, cartItem.quantity + 1);
    } else {
      cart.items.push(new CartItem(food));
    }
    this.storeCart$$.next(cart);
  }

  removeFromCart(foodId: number): void {
    const cart = this.storeCart$$.value;
    cart.items = cart.items.filter(item => item.food.id !== foodId);
    this.storeCart$$.next(cart);
  }

  changeQuantity(foodId: number, quantity: number) {
    const cart = this.storeCart$$.value;
    let cartItem = cart.items.find(item => item.food.id === foodId);
    if (!cartItem) return;
    cartItem.quantity = quantity;
    this.storeCart$$.next(cart);
  }

  getCart(): Observable<Cart> {
    return this.storeCart$$;
  }
}
