import { Injectable } from '@angular/core';

// Produkt-Interface
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  color?: string;
  size?: string;
  stock?: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  // Dummy-Produkte für ein datenbankfreies Projekt
  private products: Product[] = [
    {
      id: 1,
      name: 'Beispielprodukt 1',
      description: 'Beschreibung für Produkt 1',
      price: 100,
      imageUrl: 'placeholder1.jpg',
      category: 'Handtasche',
      color: 'Schwarz',
      size: 'Mittel',
      stock: 10,
    },
    {
      id: 2,
      name: 'Beispielprodukt 2',
      description: 'Beschreibung für Produkt 2',
      price: 200,
      imageUrl: 'placeholder2.png',
      category: 'Schmuck',
      color: 'Weiß',
      size: 'Klein',
      stock: 5,
    },
    // ...weitere Dummy-Produkte nach Bedarf...
  ];

  getProducts(): Product[] {
    return this.products;
  }

  getProductById(id: number): Product | undefined {
    return this.products.find(p => p.id === id);
  }

  getProductsByCategory(category: string): Product[] {
    return this.products.filter(p => p.category === category);
  }
}
