import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product, ProductService } from './product.service';
import { isPlatformBrowser } from '@angular/common';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface StoredCartItem {
  productId: number;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  private cartTotalSubject = new BehaviorSubject<number>(0);
  private cartLoaded = false;
  private isBrowser: boolean;

  constructor(
    private productService: ProductService,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    
    // Beim Start versuchen, den gespeicherten Warenkorb aus dem localStorage zu laden
    if (this.isBrowser) {
      this.loadCart();
    }
  }

  getCartItems(): Observable<CartItem[]> {
    return this.cartItemsSubject.asObservable();
  }

  getCartTotal(): Observable<number> {
    return this.cartTotalSubject.asObservable();
  }

  getCartItemsValue(): CartItem[] {
    return this.cartItems;
  }

  addToCart(product: Product, quantity: number = 1): void {
    console.log('Füge Produkt zum Warenkorb hinzu:', product);
    
    // Überprüfen, ob das Produkt bereits im Warenkorb ist
    const existingItemIndex = this.cartItems.findIndex(item => item.product.id === product.id);
    
    if (existingItemIndex !== -1) {
      // Wenn das Produkt bereits im Warenkorb ist, erhöhe die Menge
      this.cartItems[existingItemIndex].quantity += quantity;
      console.log('Produktmenge erhöht:', this.cartItems[existingItemIndex]);
    } else {
      // Sonst füge ein neues CartItem hinzu
      this.cartItems.push({ product, quantity });
      console.log('Neues Produkt hinzugefügt');
    }
    
    // Warenkorb aktualisieren und speichern
    this.updateCart();
  }

  removeFromCart(productId: number): void {
    console.log('Entferne Produkt aus Warenkorb, ID:', productId);
    
    // Produkt aus dem Warenkorb entfernen
    this.cartItems = this.cartItems.filter(item => item.product.id !== productId);
    
    // Warenkorb aktualisieren und speichern
    this.updateCart();
  }

  updateQuantity(productId: number, quantity: number): void {
    console.log(`Aktualisiere Menge für Produkt ID ${productId} auf ${quantity}`);
    
    const itemIndex = this.cartItems.findIndex(item => item.product.id === productId);
    
    if (itemIndex !== -1) {
      if (quantity <= 0) {
        // Wenn die Menge 0 oder weniger ist, entferne das Produkt
        this.removeFromCart(productId);
      } else {
        // Sonst aktualisiere die Menge
        this.cartItems[itemIndex].quantity = quantity;
        this.updateCart();
      }
    }
  }

  clearCart(): void {
    console.log('Warenkorb wird geleert');
    this.cartItems = [];
    this.updateCart();
  }

  getItemCount(): number {
    return this.cartItems.reduce((count, item) => count + item.quantity, 0);
  }
  calculateTotal(): number {
    // Sicherstellen, dass der Preis als Zahl verarbeitet wird
    return this.cartItems.reduce((total, item) => {
      const price = typeof item.product.price === 'string' 
        ? parseFloat(item.product.price) 
        : item.product.price;
        
      if (isNaN(price)) {
        console.error('Ungültiger Preis für Produkt:', item.product);
        return total;
      }
      
      return total + (price * item.quantity);
    }, 0);
  }

  private updateCart(): void {
    // BehaviorSubjects mit aktuellen Werten aktualisieren
    this.cartItemsSubject.next([...this.cartItems]);    this.cartTotalSubject.next(this.calculateTotal());
    
    // Warenkorb im localStorage speichern
    if (this.isBrowser) {
      this.saveCart();
    }
    
    console.log('Warenkorb aktualisiert:', this.cartItems);
    console.log('Gesamtsumme:', this.calculateTotal());
  }
  private saveCart(): void {
    if (!this.isBrowser) return;
    
    try {
      // Da Product-Objekte Methoden oder zirkuläre Referenzen enthalten könnten,
      // speichern wir nur die notwendigen Daten
      const simplifiedCart = this.cartItems.map(item => ({
        productId: item.product.id,
        quantity: item.quantity
      }));
      
      localStorage.setItem('cart', JSON.stringify(simplifiedCart));
    } catch (error) {
      console.error('Fehler beim Speichern des Warenkorbs:', error);
    }
  }
  private loadCart(): void {
    if (!this.isBrowser) return;
    
    try {
      const savedCart = localStorage.getItem('cart');
      
      if (savedCart) {
        const storedItems: StoredCartItem[] = JSON.parse(savedCart);
        console.log('Gespeicherter Warenkorb gefunden:', storedItems);
        
        if (storedItems && storedItems.length > 0) {
          // Für jedes gespeicherte Item das vollständige Produkt laden
          storedItems.forEach(item => {
            this.productService.getProductById(item.productId).subscribe(
              product => {
                this.cartItems.push({
                  product: product,
                  quantity: item.quantity
                });
                this.updateCart();
              },
              error => {
                console.error(`Fehler beim Laden des Produkts mit ID ${item.productId}:`, error);
              }
            );
          });
        }
      }
    } catch (error) {
      console.error('Fehler beim Laden des Warenkorbs:', error);
    }
  }
}
