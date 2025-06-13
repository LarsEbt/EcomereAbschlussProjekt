import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

// Produkt-Interface (gleich wie in der Komponente)
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  color?: string;
  size?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  // Die URL zu deinem Backend-API mit vollständiger Adresse
  private apiUrl = 'http://localhost:3000/api/products';

  constructor(private http: HttpClient) {}

  // Methode zum Abrufen aller Produkte
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  // Methode zum Abrufen eines einzelnen Produkts nach ID
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  // Methode zum Abrufen von Produkten nach Kategorie
  getProductsByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(
      `http://localhost:3000/api/category/${category}`
    );
  }

  // Weitere mögliche Methoden:
  // - createProduct
  // - updateProduct
  // - deleteProduct
}
