import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component'; // Import hinzufügen
import { FooterComponent } from './components/footer/footer.component'; // Import hinzufügen

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent], // Header und Footer hinzufügen
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'] 
})
export class AppComponent {
  title = 'arqive';
}
