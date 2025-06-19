import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService, Product } from '../../services/product.service';

@Component({  selector: 'app-product-browser',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './product-browser.component.html',
  styleUrls: ['./product-browser.component.scss'],
})
export class ProductBrowserComponent implements OnInit {
  // Arrays für die verschiedenen Produktkategorien
  handtaschenProducts: Product[] = [];
  schmuckProducts: Product[] = [];

  // Filter-Zustand (nur für UI, keine Funktionalität)
  minPrice: number = 0;
  maxPrice: number = 10000;
  selectedColors: string[] = [];
  selectedSizes: string[] = [];
  selectedTypes: string[] = [];

  // Math-Objekt für Template-Verwendung
  Math = Math;

  // Konstanten für die Anzahl der Produkte
  readonly SHOW_LIST_COUNT = 3;
  readonly TOTAL_PRODUCTS_PER_CATEGORY = 12;
  
  constructor(private productService: ProductService) {}
  ngOnInit(): void {
    // Produkte beim Initialisieren der Komponente laden
    this.loadProducts();
  }
  // Methode zum Laden der Produkte mit dem Service
  loadProducts(): void {
    const products = this.productService.getProducts();
    this.handtaschenProducts = products.filter(
      (p) => p.category && (
        p.category.toLowerCase().trim() === 'handtasche' ||
        p.category.toLowerCase().trim() === 'handtaschen'
      )
    );
    this.schmuckProducts = products.filter(
      (p) => p.category && p.category.toLowerCase().trim() === 'schmuck'
    );
  }

  // Methoden für Platzhalter-Berechnung
  getShowListPlaceholderCount(products: Product[]): number {
    return Math.max(0, this.SHOW_LIST_COUNT - products.length);
  }

  getNormalListPlaceholderCount(products: Product[]): number {
    const remainingProducts = Math.max(0, products.length - this.SHOW_LIST_COUNT);
    return Math.max(0, this.TOTAL_PRODUCTS_PER_CATEGORY - this.SHOW_LIST_COUNT - remainingProducts);
  }

  // Helper-Methode für Platzhalter-Arrays
  createRange(count: number): number[] {
    return Array(count).fill(0).map((_, i) => i);
  }

  // Handler für Typ-Änderungen
  handleTypeChange(event: any, type: string): void {
    if (event.target.checked) {
      this.selectedTypes.push(type);
    } else {
      this.selectedTypes = this.selectedTypes.filter((t) => t !== type);
    }
    this.applyFilters();
  }

  // Handler für Farb-Änderungen
  handleColorChange(event: any, color: string): void {
    if (event.target.checked) {
      this.selectedColors.push(color);
    } else {
      this.selectedColors = this.selectedColors.filter((c) => c !== color);
    }
    this.applyFilters();
  }

  // Handler für Größen-Änderungen
  handleSizeChange(event: any, size: string): void {
    if (event.target.checked) {
      this.selectedSizes.push(size);
    } else {
      this.selectedSizes = this.selectedSizes.filter((s) => s !== size);
    }
    this.applyFilters();
  }

  // Leere Methoden für UI-Elemente, die keine Funktionalität haben sollen
  applyFilters(): void {
    // Keine Backend-Filterung mehr, ggf. Filter-Logik für Dummy-Produkte hier einbauen
    this.loadProducts();
  }

  // Methode zum Aktualisieren der Preisfilter (für die Range-Inputs)
  updatePriceFilter(min: number, max: number): void {
    this.minPrice = min;
    this.maxPrice = max;
  }
}
