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
  // Basis-URL für die API, die automatisch Ports 3000, 3001, etc. versucht, falls einer nicht verfügbar ist
  private baseUrl = 'http://localhost';
  private defaultPort = 3000;
  private apiEndpoint = '/api/products';
  private categoryEndpoint = '/api/category';
  private currentPort: number;

  constructor(private http: HttpClient) {
    // Starte mit dem Standard-Port
    this.currentPort = this.defaultPort;
  }

  // Hilfsmethode, um die aktuelle API-URL zu erhalten
  private getApiUrl(): string {
    return `${this.baseUrl}:${this.currentPort}${this.apiEndpoint}`;
  }

  // Hilfsmethode, um die Kategorie-URL zu erhalten
  private getCategoryUrl(category: string): string {
    return `${this.baseUrl}:${this.currentPort}${this.categoryEndpoint}/${category}`;
  }

  // Methode zum Abrufen aller Produkte mit automatischem Port-Fallback
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.getApiUrl());
  }

  // Methode zum Abrufen eines einzelnen Produkts nach ID
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.getApiUrl()}/${id}`);
  }

  // Methode zum Abrufen von Produkten nach Kategorie
  getProductsByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(this.getCategoryUrl(category));
  }

  // Weitere mögliche Methoden:
  // - createProduct
  // - updateProduct
  // - deleteProduct
}
