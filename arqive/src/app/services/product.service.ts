import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Produkt-Interface
export interface Product {
  id: number;
  Marke: string;
  marke?: string;
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
  private apiUrl = 'https://iyurydzutlzictqulskw.supabase.co/rest/v1/products';
  private apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5dXJ5ZHp1dGx6aWN0cXVsc2t3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5MDUwMDcsImV4cCI6MjA2MzQ4MTAwN30.JnC90EvVAq0aOcd5_vq-VNT5Uz-nBMbEvNSPE2uvE9E';

  constructor(private http: HttpClient) {
    console.log('ProductService: Initialisiert');
  }

  // Alle Produkte holen
  getProducts(): Observable<Product[]> {
    console.log('ProductService: Hole alle Produkte...');
    
    const headers = new HttpHeaders({
      'apikey': this.apiKey,
      'Content-Type': 'application/json'
    });

    return this.http.get<Product[]>(`${this.apiUrl}?select=*`, { headers }).pipe(
      map(data => {
        console.log('Produkte erfolgreich geladen:', data.length);
        if (data && data.length > 0) {
          console.log('Beispiel-Produkt:', data[0]);
        }
        return data;
      })
    );
  }
  // Produkte nach Kategorie filtern (nur im Frontend)
  filterProductsByCategory(products: Product[], category: string): Product[] {
    console.log('Filtern nach Kategorie:', category);
    console.log('Verfügbare Kategorien:', [...new Set(products.map(p => p.category))]);
    
    return products.filter(product => {
      // Umwandlung in Kleinbuchstaben und Entfernung von Leerzeichen am Anfang/Ende
      const productCategory = (product.category || '').trim().toLowerCase();
      const searchCategory = category.trim().toLowerCase();
      
      // Prüfen, ob die Kategorie im Produkt enthalten ist (teilweise Übereinstimmung)
      return productCategory.includes(searchCategory);
    });
  }
}
