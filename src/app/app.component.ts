import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BlackButtonComponent } from './components/atoms/black-button/black-button.component';
import { VinculacionNaturalComponent } from './components/organisms/vinculacion-natural/vinculacion-natural.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'onboarding-cmo';
}
