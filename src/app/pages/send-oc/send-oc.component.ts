import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LogoComponent } from '../../components/atoms/logo/logo.component';
import { InvoiceLodgingService } from '../../services/invoiceLodging.service';
import { ValidateOcInfoComponent } from '../validate-oc-info/validate-oc-info.component';

@Component({
    selector: 'app-send-oc',
    imports: [
        LogoComponent,
        ReactiveFormsModule,
        FormsModule,
        ValidateOcInfoComponent
    ],
    templateUrl: './send-oc.component.html',
    styleUrl: './send-oc.component.css'
})
export class SendOcComponent {
  sendOcForm: FormGroup;
  emailSent: boolean = false;
  loading: boolean = false;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private iS: InvoiceLodgingService
  ) {
    this.sendOcForm = this.fb.group({
      email: [''],
      purchaseOrdersIds: [''],
      document: [0]
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      const email = window.history.state.email;
      const purchaseOrdersIds = window.history.state.purchaseOrdersIds;
      const document = window.history.state.document;

      if (email && purchaseOrdersIds) {
        this.sendOcForm.patchValue({
          email,
          purchaseOrdersIds: purchaseOrdersIds.join(', '),
          document
        });
      } else {
        this.router.navigate(['/oc-error']);
      }
    });
  }

  sendForm() {
    this.loading = true;
    this.iS.sendPurchaseOrdersToEmail(this.sendOcForm.value).subscribe(
      (response) => {
        this.loading = false;
        this.emailSent = true;
      });
  }

  backToHome() {
    this.router.navigate(['/']);
  }

  getControl(controlName: string) {
    return this.sendOcForm?.get(controlName);
  }
}
