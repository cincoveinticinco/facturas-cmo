import { Component, OnInit } from '@angular/core';
import { LogoComponent } from '../../components/atoms/logo/logo.component';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TIPOPERSONA } from '../../shared/interfaces/typo_persona';
import { SelectInputComponent } from '../../components/atoms/select-input/select-input.component';
import { TextInputComponent } from '../../components/atoms/text-input/text-input.component';
import { Router } from '@angular/router';
import { InvoiceLodgingService } from '../../services/invoiceLodging.service';
import { TIPODOCUMENTO } from '../../shared/interfaces/typo_documentos';
import { ValidateOcInfoComponent } from '../validate-oc-info/validate-oc-info.component';
import { delay, tap } from 'rxjs';
import { AuthOcService } from '../../services/auth-oc.service';
import { SelectOption } from '../../components/molecules/inf-step-one/inf-step-one.component';

@Component({
  selector: 'app-invoice-lodging',
  standalone: true,
  imports: [
    LogoComponent, 
    MatTabsModule,
    ReactiveFormsModule,
    FormsModule,
    SelectInputComponent,
    TextInputComponent,
    ValidateOcInfoComponent
  ],
  templateUrl: './invoice-lodging.component.html',
  styleUrl: './invoice-lodging.component.css'
})
export class InvoiceLodgingComponent implements OnInit {
  invoiceLodgingForm: FormGroup;
  documentTypes: any[] = [];
  formattedDocumentTypes: SelectOption[] = [];
  loading: boolean = false;
  formErrors: string[] = [];
  TIPOPERSONA = TIPOPERSONA;
  TIPODOCUMENTO = TIPODOCUMENTO;
  userEmail: string = '';
  purchaseOrdersIds: string[] = [];
  validationPending: boolean = false;

  constructor(public fb: FormBuilder, public router: Router, private iS: InvoiceLodgingService, private auth: AuthOcService) {
    this.invoiceLodgingForm = fb.group({
      personType: new FormControl(TIPOPERSONA.Natural, [Validators.required]),
      documentType: new FormControl('', [Validators.required]),
      documentNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      orderNumber: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    this.loadDocumentTypes();
    this.validateSession();
  }

  validateSession() {
    this.auth.getSession().then((isLoggedIn: any) => {
      if (isLoggedIn) {
        const vendor_id = this.iS.getVendorId();
        console.log('vendor_id', vendor_id);
        if (vendor_id) {
          this.router.navigate(['/oc-forms', vendor_id]);
        }
        return true;
      }
      return false;
    });
  }

  loadDocumentTypes() {
    this.loading = true;
    this.iS.getDocumentTypes().subscribe((data: any) => {
      this.documentTypes = data;
      this.loading = false;
      console.log(this.documentTypes);
      this.filterDocumentTypes(this.getControl('personType').value);
    });
  }

  getDocumentPattern() {
    return this.getControl('personType').value === TIPOPERSONA.Natural ? '^[0-9]*$' : '^[0-9]{1,9}$';
  }

  filterDocumentTypes(typePersonId: TIPOPERSONA) {
    if (typePersonId === TIPOPERSONA.Natural) {
      this.formattedDocumentTypes = this.documentTypes
        .filter(doc => doc.id !== TIPODOCUMENTO.NIT)
        .map(item => ({optionValue: item.id, optionName: item.documentTypeEsp}));
    } else {
      this.formattedDocumentTypes = this.documentTypes
        .filter(doc => doc.id === TIPODOCUMENTO.NIT)
        .map(item => ({optionValue: item.id, optionName: item.documentTypeEsp}));
    }
  }

  sendForm() {
    if(this.invoiceLodgingForm.valid) {
      this.validationPending = true;
      this.iS.authenticateUser(this.invoiceLodgingForm.value).pipe(
        delay(2000),
        tap((response) => {
          if (response.status === 200) {
            console.log('SENDING')
            const vendorId = response.vendor_id;
            this.router.navigate(['/oc-forms', vendorId]);
          } else {
            this.router.navigate(['/oc-error']);
          }
        })
      ).subscribe(() => {
        this.validationPending = false;
      });
    } else {
      this.getControl('personType').markAsTouched();
      this.getControl('documentType').markAsTouched();
      this.getControl('documentNumber').markAsTouched();
      this.getControl('orderNumber').markAsTouched();
    }
  }

  getControl(controlName: string) {
    return this.invoiceLodgingForm?.get(controlName) as FormControl;
  }

  validatyDocumentTypeAndNumber() {
    const documentType = this.getControl('documentType').value;
    const documentNumber = this.getControl('documentNumber').value;
  
    if(documentType && documentNumber) {
      this.validationPending = true;
      return true;
    } else {
      this.getControl('documentType').markAsTouched();
      this.getControl('documentNumber').markAsTouched();
      
      const error = 'Por favor, complete los campos de tipo de documento y número de documento para recibir la orden de compra';
      this.formErrors.push(error);
      setTimeout(() => {
        this.formErrors = this.formErrors.filter((item) => item !== error);
      }, 5000);
      return false;
    }
  }

  onTabChange(event: MatTabChangeEvent) {
    const selectedIndex = event.index;
    if (selectedIndex === 0) {
      this.changePersonTypeValue(TIPOPERSONA.Natural);
    } else if (selectedIndex === 1) {
      this.changePersonTypeValue(TIPOPERSONA.Juridica);
    }
  }

  receivePurchaseOrders() {
    if(this.validatyDocumentTypeAndNumber()) {
      const vendorDocument = this.getControl('documentNumber').value;
      this.iS.getPurchaseOrders(vendorDocument).subscribe(
        (response: any) => {
          setTimeout(() => {
            this.validationPending = false;
          }, 2000);
          if (response.status === 200) {
            setTimeout(() => {
              this.router.navigate(['/sent-oc'], { 
                state: { email: response.vendorEmail, purchaseOrdersIds: response.purchaseOrders, document: vendorDocument } 
              });
            }, 2000);
          } else {
            setTimeout(() => {
              this.router.navigate(['/oc-error']);
            }, 2000);
          }
        },
        (error) => {
          this.validationPending = false;
          this.router.navigate(['/oc-error']);
        }
      );
    }
  }

  changePersonTypeValue(typePersonId: TIPOPERSONA) {
    this.getControl('documentType').setValue('');
    this.getControl('documentNumber').setValue('');
    this.getControl('personType').setValue(typePersonId);
    this.filterDocumentTypes(typePersonId);
  }
}