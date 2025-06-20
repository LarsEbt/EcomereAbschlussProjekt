import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService, Product } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss',
})
export class ProductPageComponent implements OnInit {
  product: Product | null = null;
  relatedProducts: Product[] = [];
  productId: number = 0;
  loading: boolean = true;
  error: string | null = null;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    // ID aus der URL abrufen
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.productId = +idParam; // String zu Zahl konvertieren
        this.loadProduct();
      } else {
        this.error = 'Keine Produkt-ID gefunden';
        this.loading = false;
      }
    });
  }

  loadProduct(): void {
    this.loading = true;
    this.error = null;

    this.productService.getProductById(this.productId).subscribe({
      next: (product) => {
        this.product = product;
        console.log('Produkt geladen:', product);
        
        // Verwandte Produkte laden
        this.loadRelatedProducts();
      },
      error: (err) => {
        console.error('Fehler beim Laden des Produkts:', err);
        this.error = 'Produkt konnte nicht geladen werden';
        this.loading = false;
      }
    });
  }

  loadRelatedProducts(): void {
    if (!this.product) {
      this.loading = false;
      return;
    }

    this.productService.getRelatedProducts(this.product).subscribe({
      next: (products) => {
        this.relatedProducts = products;
        console.log('Verwandte Produkte geladen:', products.length);
        this.loading = false;
      },
      error: (err) => {
        console.error('Fehler beim Laden verwandter Produkte:', err);
        this.loading = false;
      }
    });
  }

  addToCart(): void {
    if (this.product) {
      this.cartService.addToCart(this.product);
      // Optional: Feedback an den Benutzer (Toast, Meldung, etc.)
      console.log(`Produkt ${this.product.name} zum Warenkorb hinzugefügt`);
      
      // Optional: Zur Warenkorb-Seite navigieren oder einen Toast anzeigen
      // this.router.navigate(['/basket']);
    }
  }
  
  buyNow(): void {
    if (this.product) {
      this.cartService.addToCart(this.product);
      this.router.navigate(['/basket']);
    }
  }
}
