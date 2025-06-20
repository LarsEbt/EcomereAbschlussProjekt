import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isOverlay = false;
  cartItemCount = 0;

  constructor(
    private router: Router,
    private cartService: CartService
  ) {
    // Sofort den Overlay-Status setzen
    this.isOverlay = this.router.url.includes('/product-browser');

    // Bei Routenwechseln den Overlay-Status aktualisieren
    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.isOverlay = event.url.includes('/product-browser');
      });
  }

  ngOnInit(): void {
    // Warenkorb-Anzahl verfolgen
    this.cartService.getCartItems().subscribe(items => {
      this.cartItemCount = items.reduce((count, item) => count + item.quantity, 0);
    });
  }
}
