import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceLodgingService } from '../../services/invoiceLodging.service';
import { delay, tap } from 'rxjs/operators';

@Component({
  selector: 'app-validate-oc-info',
  standalone: true,
  imports: [],
  templateUrl: './validate-oc-info.component.html',
  styleUrl: './validate-oc-info.component.css'
})

export class ValidateOcInfoComponent implements OnInit {
  registerId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private ilsService: InvoiceLodgingService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      this.registerId = params.registerId;
      if (this.registerId) {
        this.authenticateUser();
      }
    });
  }

  private authenticateUser() {
    this.ilsService.authenticateUserWithRegisterId(this.registerId!)
      .pipe(
        delay(2000),
        tap((response: any) => {
          if (response.status === 200) {
            const vendorId = response.vendor_id;
            this.router.navigate(['/oc-forms', vendorId]);
          } else if (response?.expiration_nulled) {
            this.router.navigate(['/expiration-error']);
          } else {
            this.router.navigate(['/oc-error']);
          }
        })
      )
      .subscribe({
        error: (error) => {
          console.error('Authentication error:', error);
          this.router.navigate(['/oc-error']);
        }
      });
  }
}
