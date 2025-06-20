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
    });    return this.http.get<Product[]>(`${this.apiUrl}?select=*`, { headers }).pipe(
      map(data => {
        console.log('Produkte erfolgreich geladen:', data.length);
        if (data && data.length > 0) {
          console.log('Beispiel-Produkt:', data[0]);
        }
        
        // Bild-URLs korrigieren
        return data.map(product => {
          if (product.imageUrl) {
            // Backslashes durch Slashes ersetzen
            let fixedPath = product.imageUrl.replace(/\\/g, '/');
            
            // Prüfen, ob es ein relativer Pfad ist und entsprechend anpassen
            if (fixedPath.startsWith('arqive/public/') || fixedPath.startsWith('arqive\\public\\')) {
              fixedPath = fixedPath.replace(/^arqive[\\\/]public[\\\/]/, '');
            }
            
            // Sicherstellen, dass die URL mit / beginnt, wenn sie relativ ist
            if (!fixedPath.startsWith('http') && !fixedPath.startsWith('/')) {
              fixedPath = '/' + fixedPath;
            }
            
            console.log(`Bild-URL korrigiert: "${product.imageUrl}" -> "${fixedPath}"`);
            product.imageUrl = fixedPath;
          }
          return product;
        });
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

  // Ein einzelnes Produkt anhand der ID abrufen
  getProductById(id: number): Observable<Product> {
    console.log(`ProductService: Hole Produkt mit ID ${id}...`);
    
    const headers = new HttpHeaders({
      'apikey': this.apiKey,
      'Content-Type': 'application/json'
    });
    
    return this.http.get<Product[]>(`${this.apiUrl}?id=eq.${id}&select=*`, { headers }).pipe(
      map(data => {
        if (data && data.length > 0) {
          console.log('Produkt gefunden:', data[0]);
          
          // Bild-URL korrigieren
          let product = data[0];
          if (product.imageUrl) {
            // Backslashes durch Slashes ersetzen
            let fixedPath = product.imageUrl.replace(/\\/g, '/');
            
            // Prüfen, ob es ein relativer Pfad ist und entsprechend anpassen
            if (fixedPath.startsWith('arqive/public/') || fixedPath.startsWith('arqive\\public\\')) {
              fixedPath = fixedPath.replace(/^arqive[\\\/]public[\\\/]/, '');
            }
            
            // Sicherstellen, dass die URL mit / beginnt, wenn sie relativ ist
            if (!fixedPath.startsWith('http') && !fixedPath.startsWith('/')) {
              fixedPath = '/' + fixedPath;
            }
            
            console.log(`Bild-URL korrigiert: "${product.imageUrl}" -> "${fixedPath}"`);
            product.imageUrl = fixedPath;
          }
          
          return product;
        } else {
          console.error(`Produkt mit ID ${id} nicht gefunden`);
          throw new Error(`Produkt mit ID ${id} nicht gefunden`);
        }
      })
    );
  }
  
  // Verwandte Produkte abrufen (gleiche Kategorie, andere Produkte)
  getRelatedProducts(product: Product, limit: number = 8): Observable<Product[]> {
    console.log(`ProductService: Hole verwandte Produkte für Kategorie ${product.category}...`);
    
    return this.getProducts().pipe(
      map(products => {
        // Produkte der gleichen Kategorie finden, aber die aktuelle ID ausschließen
        const relatedProducts = products.filter(p => 
          p.category.toLowerCase().includes(product.category.toLowerCase()) && 
          p.id !== product.id
        );
        
        // Zufällige Sortierung für abwechslungsreiche Vorschläge
        const shuffled = [...relatedProducts].sort(() => 0.5 - Math.random());
        
        // Nur die angegebene Anzahl zurückgeben
        return shuffled.slice(0, limit);
      })
    );
  }
}
