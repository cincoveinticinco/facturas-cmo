import { Component } from '@angular/core';
import { LogoComponent } from '../../components/atoms/logo/logo.component';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [LogoComponent],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.css'
})
export class PageNotFoundComponent {

}
