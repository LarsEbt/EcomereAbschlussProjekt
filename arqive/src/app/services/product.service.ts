import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Observable, from, catchError, of } from 'rxjs';

// Produkt-Interface
export interface Product {
  id: number;
  Marke: string;
  marke?: string; // Alternative für Datenbankspalte mit Kleinbuchstaben
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
  private supabase: SupabaseClient;
  // Trage hier deine Supabase-URL und den API-Key ein:
  private supabaseUrl = 'https://iyurydzutlzictqulskw.supabase.co';
  private supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5dXJ5ZHp1dGx6aWN0cXVsc2t3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5MDUwMDcsImV4cCI6MjA2MzQ4MTAwN30.JnC90EvVAq0aOcd5_vq-VNT5Uz-nBMbEvNSPE2uvE9E';

  constructor() {
    try {
      this.supabase = createClient(this.supabaseUrl, this.supabaseKey);
    } catch (error) {
      console.error('Fehler beim Erstellen des Supabase-Clients:', error);
      throw error;
    }
  }

  // Holt alle Produkte aus der Supabase-Tabelle "products"
  getProducts(): Observable<Product[]> {
    return from(
      this.supabase
        .from('products')
        .select('*')
        .then((result) => {
          if (result.error) {
            console.error('Supabase Fehler:', result.error);
            return [] as Product[];
          }
          return result.data as Product[];
        })
    ).pipe(
      catchError((error) => {
        console.error('Fehler bei Supabase-Abfrage:', error);
        return of([]);
      })
    );
  }

  // Holt Produkte nach Kategorie
  getProductsByCategory(category: string): Observable<Product[]> {
    return from(
      this.supabase
        .from('products')
        .select('*')
        .eq('category', category)
        .then((result) => {
          if (result.error) {
            console.error('Supabase Fehler:', result.error);
            return [] as Product[];
          }
          return result.data as Product[];
        })
    ).pipe(
      catchError((error) => {
        console.error('Fehler bei Supabase-Abfrage:', error);
        return of([]);
      })
    );
  }
}
