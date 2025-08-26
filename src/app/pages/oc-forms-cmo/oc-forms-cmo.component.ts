import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PanelButtonsComponent } from '../../components/molecules/panel-buttons/panel-buttons.component';
import { LogoComponent } from '../../components/atoms/logo/logo.component';
import { InvoiceNaturalFormComponent } from '../../components/organisms/invoice-natural-form/invoice-natural-form.component';
import { AuthOcService } from '../../services/auth-oc.service';
import { InvoiceLodgingService } from '../../services/invoiceLodging.service';
import { TIPOPERSONA } from '../../shared/interfaces/typo_persona';
import { InvoiceJuridicaFormComponent } from '../../components/organisms/invoice-juridica-form/invoice-juridica-form.component';
import { GlobalService } from '../../services/global.service';
import { REGISTER_STATUSES } from '../../shared/interfaces/register_types';
import { DialogComponent } from '../../shared/components/dialog/dialog.component';
import { ReactiveFormsModule } from '@angular/forms';

export interface PurchaseOrders {
  id: number,
  consecutiveCodes: string,
  projectId: number,
}

@Component({
  selector: 'app-oc-forms-cmo',
  standalone: true,
  imports: [
    PanelButtonsComponent,
    LogoComponent,
    InvoiceNaturalFormComponent,
    InvoiceJuridicaFormComponent,
    DialogComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './oc-forms-cmo.component.html',
  styleUrls: ['./oc-forms-cmo.component.css']
})
export class OcFormsCmoComponent implements OnInit {

  loading = false;
  vendorInfo: any = {};
  currentStep = 1
  purchaseOrders: PurchaseOrders[] = [];
  selectedPurchaseOrders: PurchaseOrders[] = [];
  personType: number | undefined;
  purchaseOrdersProjections: any[] = [];
  PERSON_TYPES = TIPOPERSONA;
  registerCode: string | null = null;
  registerDate: string | null = null;
  registerStatus: number | undefined;
  REGISTER_STATUSES = REGISTER_STATUSES;
  view: string = '';
  errorMsg: string = '';
  notRequiredDocuments: boolean = false;

  constructor(
    private authService: AuthOcService,
    private invoiceLodgingService: InvoiceLodgingService,
    private globalService: GlobalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.getSession().then((isLoggedIn: boolean) => {
      if (!isLoggedIn) {
        this.authService.logOut();
      } else {
        this.loadFormInitialData();
      }
    });
  }

  changeView(view: string = ''): void {
    this.view = view;
  }

  redirectWhenRadicated(): void {
    if(
      this.registerStatus === REGISTER_STATUSES.RADICADO
      || this.registerStatus === REGISTER_STATUSES.APROBADO_PRODUCCIÓN
      || this.registerStatus === REGISTER_STATUSES.APROBADO_CONTABILIDAD
    ) {
      this.router.navigate(['/oc-forms-cmo/success/' + this.registerCode], {
        state: { radicado: this.registerCode, date: this.registerDate }
      });
    }
  }

  private loadFormInitialData(): void {
    this.loading = true;
    this.invoiceLodgingService.getFormInitialData().subscribe(
      (response: any) => {
        this.vendorInfo = response.vendor;
        this.personType = response.fPersonTypeId;
        this.purchaseOrders = response.purchaseOrders;
        this.selectedPurchaseOrders = response.selectedOrders;
        this.purchaseOrdersProjections = response.poProjections;
        this.registerCode = response.registerCode;
        this.registerDate = response.registerDate;
        this.registerStatus = response.fRegisterStatusId;
        this.notRequiredDocuments = !!response?.cmo_reponse_checkbox;
        this.redirectWhenRadicated();
        this.loading = false;
      },
      (error) => {
        if(error && error.status === 401) {
          this.authService.logOut();
        }
      }
    );
  }

  saveForm(event: {
    form: any, cancelLoading: any
  }): void {
    const { form, cancelLoading } = event
    this.loading = true;
    const register = this.registerCode ? parseInt(this.registerCode) : null;
    const formattedForm = this.globalService.setOcForm(form, this.vendorInfo.id, register)
    this.invoiceLodgingService.updateRegisterVendor(formattedForm).subscribe({
      next: (response: any) => {
        if (!!response?.error) {
          this.errorMsg = response?.msg;
          this.changeView('error-save-form');
          this.loading = false;
          return;
        }

        this.router.navigate(['/oc-forms-cmo/success/' + response.registerId], {
          state: { radicado: response.radicado, url: response.url, date: response.registerDate }
        });

        this.loading = false;
      }
    });
  }

  handleStepChange(event: 'next' | 'previous', form: any = null): void {
    if (event === 'next' && this.currentStep <= 3) {
      this.currentStep++;
    } else if (event === 'previous' && this.currentStep > 1) {
      this.currentStep--;
    }
  }

  getFormattedOcOptions(purchaseOrders: PurchaseOrders[]): any[] {
    return purchaseOrders.map((order: any) => ({
      optionValue: order.id,
      optionName: order.consecutiveCodes
    })) || [];
  }
}
