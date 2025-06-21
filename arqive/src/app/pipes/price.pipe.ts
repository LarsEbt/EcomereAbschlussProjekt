import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price',
  standalone: true
})
export class PricePipe implements PipeTransform {  transform(value: any): string {
    // Stellt sicher, dass der Wert eine Zahl ist
    let numValue: number;
    
    if (typeof value === 'string') {
      numValue = parseFloat(value);
      // Debug-Info wenn value ein String ist
      console.log(`PricePipe: String-Wert konvertiert: "${value}" -> ${numValue}`);
    } else if (typeof value === 'number') {
      numValue = value;
    } else {
      console.error(`PricePipe: Unerwarteter Typ: ${typeof value}, Wert:`, value);
      numValue = 0;
    }
    
    // Prüft, ob es eine gültige Zahl ist
    if (isNaN(numValue)) {
      console.error('PricePipe: Ungültiger Preis:', value);
      return '0.00€';
    }
    
    // Formatiert die Zahl mit 2 Dezimalstellen und fügt das Euro-Zeichen hinzu
    return numValue.toFixed(2) + '€';
  }
}
