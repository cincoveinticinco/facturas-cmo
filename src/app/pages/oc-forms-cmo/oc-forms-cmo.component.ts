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

export interface PurchaseOrders {
  id: number,
  consecutiveCodes: string,
  projectId: number,
}

@Component({
  selector: 'app-oc-forms-cmo',
  standalone: true,
  imports: [PanelButtonsComponent, LogoComponent, InvoiceNaturalFormComponent, InvoiceJuridicaFormComponent],
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
      const register = this.registerCode ? parseInt(this.registerCode) : null;
      const formattedForm = this.globalService.setOcForm(form, this.vendorInfo.id, register)
      console.log(formattedForm, 'FORMATED FORM')
      this.invoiceLodgingService.updateRegisterVendor(formattedForm).subscribe(
        (response: any) => {
          this.router.navigate(['/oc-forms-cmo/success/' + response.registerId], {
            state: { radicado: response.radicado }
          });
          cancelLoading()
        },
        () => {
          console.log('Error');
        }
      );
    }

  handleStepChange(event: 'next' | 'previous', form: any = null): void {
    if (event === 'next' && this.currentStep <= 3) {
      this.currentStep++;
      console.log('Current step', this.currentStep);
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
