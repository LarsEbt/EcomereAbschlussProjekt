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
      next: (products) => {        
        console.log('Alle Produkte geladen:', products.length);
        
        // Extra Prüfung und Korrektur für Preise
        products.forEach(product => {
          if (product.id === 1) {
            console.log(`DEBUG - Produkt ID 1 vor Korrektur: price=${product.price}, type=${typeof product.price}`);
          }
          
          // Sicherstellen, dass der Preis eine Zahl ist
          if (typeof product.price !== 'number') {
            const originalPrice = product.price;
            product.price = parseFloat(String(product.price));
            
            if (isNaN(product.price)) {
              console.error(`Ungültiger Preis für Produkt ID ${product.id}:`, originalPrice);
              product.price = 0; // Default-Wert setzen
            }
            
            if (product.id === 1) {
              console.log(`DEBUG - Produkt ID 1 nach Korrektur: price=${product.price}, type=${typeof product.price}`);
            }
          }
        });
        
        // Spezieller Fix für Produkt ID 1
        products = this.productService.fixProductId1Price(products);
        
        // Produkte nach Kategorie filtern
        this.handtaschenProducts = this.productService.filterProductsByCategory(products, 'Handtasche');
        this.schmuckProducts = this.productService.filterProductsByCategory(products, 'Schmuck');
        
        // Produkte nach ID sortieren (aufsteigend)
        this.handtaschenProducts.sort((a, b) => a.id - b.id);
        this.schmuckProducts.sort((a, b) => a.id - b.id);
        
        // Debug: Prüfen, ob Produkt mit ID 1 korrekt angezeigt wird
        const productId1 = [...this.handtaschenProducts, ...this.schmuckProducts].find(p => p.id === 1);
        if (productId1) {
          console.log('DEBUG - Produkt ID 1 in ProductBrowser nach Filterung:', {
            id: productId1.id,
            name: productId1.name,
            price: productId1.price,
            priceType: typeof productId1.price,
            category: productId1.category,
            formattedPrice: new PricePipe().transform(productId1.price)
          });
        }
        
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
  
  // Debug-Methode für Produkt ID 1
  debugProductId1(): void {
    const allProducts = [...this.handtaschenProducts, ...this.schmuckProducts];
    const product = allProducts.find(p => p.id === 1);
    
    if (product) {
      console.log('DEBUG BUTTON - Produkt ID 1 gefunden:', {
        id: product.id,
        name: product.name,
        price: product.price,
        priceType: typeof product.price,
        category: product.category,
        formattedPrice: new PricePipe().transform(product.price)
      });
      
      // Prüfen, ob der Preis als Zahl gespeichert ist
      if (typeof product.price !== 'number') {
        console.error('Preis ist keine Zahl!', product.price);
        // Versuchen, den Preis als Zahl zu speichern
        product.price = parseFloat(product.price as any);
        console.log('Preis nach Konvertierung:', product.price);
      }
      
      alert(`Produkt ID 1 - Name: ${product.name}, Preis: ${product.price}, Formatiert: ${new PricePipe().transform(product.price)}`);
    } else {
      console.error('Produkt ID 1 nicht gefunden!');
      alert('Produkt ID 1 nicht gefunden!');
    }
  }
}
