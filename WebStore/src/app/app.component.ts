import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component'; // Importiere die HeaderComponent


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent], // NavigationComponent hier eintragen
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'WebStore';
}
