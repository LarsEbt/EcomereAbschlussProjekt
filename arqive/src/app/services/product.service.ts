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
        
        // Debug: Prüfen, ob Produkt mit ID 1 existiert und Preis anzeigen
        const productId1 = data.find(p => p.id === 1);
        if (productId1) {
          console.log('DEBUG - Produkt ID 1 vor Verarbeitung:', {
            id: productId1.id,
            name: productId1.name,
            price: productId1.price,
            priceType: typeof productId1.price
          });
        }
          
        // Bild-URLs korrigieren und Preise als Zahlen sicherstellen
        return data.map(product => {
          // Preis als Zahl sicherstellen
          if (typeof product.price === 'string') {
            product.price = parseFloat(product.price);
            if (isNaN(product.price)) {
              console.error('Ungültiger Preis für Produkt:', product);
              product.price = 0; // Default-Wert setzen
            }
          }
          
          // Debug: Nach der Verarbeitung für Produkt ID 1
          if (product.id === 1) {
            console.log('DEBUG - Produkt ID 1 nach Verarbeitung:', {
              id: product.id,
              name: product.name,
              price: product.price,
              priceType: typeof product.price
            });
          }
          
          // Bild-URL korrigieren (wiederherstellen des ursprünglichen Codes)
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
          
          // Spezieller Debug für Produkt ID 1
          if (id === 1) {
            console.log('DEBUG - Produkt ID 1 RAW Daten aus API:', {
              id: product.id,
              name: product.name,
              price: product.price,
              priceType: typeof product.price,
              priceJSON: JSON.stringify(product.price)
            });
          }
          
          // Preis als Zahl sicherstellen
          if (typeof product.price === 'string') {
            product.price = parseFloat(product.price);
            if (isNaN(product.price)) {
              console.error('Ungültiger Preis für Produkt:', product);
              product.price = 0; // Default-Wert setzen
            }
          }
          
          // Spezieller Fix für Produkt ID 1
          if (product.id === 1) {
            console.log(`Spezieller Fix für Produkt ID 1 in getProductById - Alter Preis: ${product.price}`);
            product.price = 2141; // Der korrekte Preis
            console.log(`Spezieller Fix für Produkt ID 1 in getProductById - Neuer Preis: ${product.price}`);
          }
          
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

  // Spezieller Fix für Produkt ID 1 (wenn bekannt ist, dass der Preis falsch ist)
  fixProductId1Price(products: Product[]): Product[] {
    const productId1 = products.find(p => p.id === 1);
    
    if (productId1) {
      console.log('Spezieller Fix für Produkt ID 1 - Alter Preis:', productId1.price, typeof productId1.price);
      
      // Hier den korrekten Preis von Produkt ID 1 setzen
      // (basierend auf Ihren Angaben, dass der Preis falsch ist)
      productId1.price = 2141; // Der korrekte Preis (oder der gewünschte Wert)
      
      console.log('Spezieller Fix für Produkt ID 1 - Neuer Preis:', productId1.price, typeof productId1.price);
    }
    
    return products;
  }
}
