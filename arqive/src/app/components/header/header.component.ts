import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isOverlay = false;

  constructor(private router: Router) {
    // Sofort den Overlay-Status setzen
    this.isOverlay = this.router.url.includes('/product-browser');

    // Bei Routenwechseln den Overlay-Status aktualisieren
    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.isOverlay = event.url.includes('/product-browser');
      });
  }
}
