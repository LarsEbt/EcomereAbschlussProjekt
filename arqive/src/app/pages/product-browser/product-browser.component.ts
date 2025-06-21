import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService, Product } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { PricePipe } from '../../pipes/price.pipe';

@Component({  
  selector: 'app-product-browser',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, PricePipe],
  templateUrl: './product-browser.component.html',
  styleUrls: ['./product-browser.component.scss'],
})
export class ProductBrowserComponent implements OnInit {
  // Arrays für die verschiedenen Produktkategorien
  handtaschenProducts: Product[] = [];
  schmuckProducts: Product[] = [];

  // Filter-UI-Zustand (Dummy, keine Funktionalität)
  minPrice: number = 0;
  maxPrice: number = 10000;
  selectedColors: string[] = [];
  selectedSizes: string[] = [];
  selectedTypes: string[] = [];

  // Math-Objekt für Template-Verwendung
  Math = Math;

  // Konstanten für die Anzahl der Produkte
  readonly SHOW_LIST_COUNT = 3;
  readonly NORMAL_LIST_COUNT = 12;
  readonly TOTAL_PRODUCTS_PER_CATEGORY = 15;
  
  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }
  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (products) => {        console.log('Alle Produkte geladen:', products.length);
        
        // Produkte nach Kategorie filtern
        this.handtaschenProducts = this.productService.filterProductsByCategory(products, 'Handtasche');
        this.schmuckProducts = this.productService.filterProductsByCategory(products, 'Schmuck');
        
        // Produkte nach ID sortieren (aufsteigend)
        this.handtaschenProducts.sort((a, b) => a.id - b.id);
        this.schmuckProducts.sort((a, b) => a.id - b.id);
        
        console.log('Handtaschen:', this.handtaschenProducts.length);
        console.log('Schmuck:', this.schmuckProducts.length);
        
        // Für jeden Typ Debug-Info ausgeben
        if (this.handtaschenProducts.length > 0) {
          console.log('Beispiel Handtasche:', this.handtaschenProducts[0]);
        }
        if (this.schmuckProducts.length > 0) {
          console.log('Beispiel Schmuck:', this.schmuckProducts[0]);
        }
      },
      error: (error) => {
        console.error('Fehler beim Laden der Produkte:', error);
      }
    });
  }

  // Methoden für Platzhalter-Berechnung
  getShowListPlaceholderCount(products: Product[]): number {
    return Math.max(0, this.SHOW_LIST_COUNT - Math.min(products?.length || 0, this.SHOW_LIST_COUNT));
  }

  getNormalListPlaceholderCount(products: Product[]): number {
    const availableForNormal = Math.max(0, (products?.length || 0) - this.SHOW_LIST_COUNT);
    return Math.max(0, this.NORMAL_LIST_COUNT - availableForNormal);
  }

  // Helper-Methode für Platzhalter-Arrays
  createRange(count: number): number[] {
    return Array(count).fill(0).map((_, i) => i);
  }

  // UI Handler (Dummy)
  handleTypeChange(event: any, type: string): void {
    if (event.target.checked) {
      this.selectedTypes.push(type);
    } else {
      this.selectedTypes = this.selectedTypes.filter((t) => t !== type);
    }
  }

  handleColorChange(event: any, color: string): void {
    if (event.target.checked) {
      this.selectedColors.push(color);
    } else {
      this.selectedColors = this.selectedColors.filter((c) => c !== color);
    }
  }

  handleSizeChange(event: any, size: string): void {
    if (event.target.checked) {
      this.selectedSizes.push(size);
    } else {
      this.selectedSizes = this.selectedSizes.filter((s) => s !== size);
    }
  }

  addToCart(product: Product, event: MouseEvent): void {
    // Verhindert, dass das Klick-Event auch den Link auslöst
    event.stopPropagation();
    
    this.cartService.addToCart(product);
    console.log(`Produkt ${product.name} zum Warenkorb hinzugefügt`);
  }
}
