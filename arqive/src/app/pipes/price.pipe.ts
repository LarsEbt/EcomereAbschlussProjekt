import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price',
  standalone: true
})
export class PricePipe implements PipeTransform {
  transform(value: any): string {
    // Stellt sicher, dass der Wert eine Zahl ist
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    
    // Prüft, ob es eine gültige Zahl ist
    if (isNaN(numValue)) {
      console.error('Ungültiger Preis:', value);
      return '0.00€';
    }
    
    // Formatiert die Zahl mit 2 Dezimalstellen und fügt das Euro-Zeichen hinzu
    return numValue.toFixed(2) + '€';
  }
}
