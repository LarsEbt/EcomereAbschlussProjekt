import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-bekki',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './bekki.component.html',
  styleUrl: './bekki.component.scss'
})
export class BekkiComponent {

}
