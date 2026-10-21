import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-expiration-error',
    imports: [],
    templateUrl: './expiration-error.component.html',
    styleUrl: './expiration-error.component.css'
})
export class ExpirationErrorComponent {
  constructor(public router: Router) { }

  goBack() {
    this.router.navigate(['/']);
  }
}
