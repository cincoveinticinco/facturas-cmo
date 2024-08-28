import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import the correct module for Router

@Component({
  selector: 'app-oc-info-error',
  standalone: true,
  imports: [],
  templateUrl: './oc-info-error.component.html',
  styleUrl: './oc-info-error.component.css'
})
export class OcInfoErrorComponent {
  constructor(public router: Router) {}

  goBack() {
    this.router.navigate(['/facturascmo']);
  }
}
