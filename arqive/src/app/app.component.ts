import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { HeaderComponent } from './components/header/header.component'; // Import hinzufügen
import { FooterComponent } from './components/footer/footer.component'; // Import hinzufügen
import { ChatbotComponent } from './components/chatbot/chatbot.component'; // Import hinzufügen

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, ChatbotComponent], // Chatbot hinzufügen
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'arqive';

    isShopPage = false;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.isShopPage = event.url.includes('/product-browser');
      });
  }
}
