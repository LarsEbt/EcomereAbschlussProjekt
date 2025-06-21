import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService, CartItem } from '../../services/cart.service';
import { PricePipe } from '../../pipes/price.pipe';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [CommonModule, RouterLink, PricePipe],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss'
})
export class BasketComponent implements OnInit {
  cartItems: CartItem[] = [];
  subtotal: number = 0;
  shipping: number = 4.99; // Fester Versandpreis
  total: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems(): void {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
      this.calculateTotals();
    });
  }

  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  updateQuantity(productId: number, newQuantity: number): void {
    this.cartService.updateQuantity(productId, newQuantity);
  }

  increaseQuantity(item: CartItem): void {
    this.updateQuantity(item.product.id, item.quantity + 1);
  }

  decreaseQuantity(item: CartItem): void {
    if (item.quantity > 1) {
      this.updateQuantity(item.product.id, item.quantity - 1);
    }
  }

  clearCart(): void {
    this.cartService.clearCart();
  }
  calculateTotals(): void {
    this.subtotal = this.cartService.calculateTotal();
    
    // Sicherstellen, dass der Subtotal gültig ist
    if (isNaN(this.subtotal)) {
      console.error('Ungültiger Subtotal-Wert:', this.subtotal);
      this.subtotal = 0;
    }
    
    this.total = this.subtotal + this.shipping;
    console.log('Warenkorb Summen berechnet:', { subtotal: this.subtotal, shipping: this.shipping, total: this.total });
  }
}
