import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { InvoiceLodgingComponent } from './pages/invoice-lodging/invoice-lodging.component';
import { SendOcComponent } from './pages/send-oc/send-oc.component';
import { ValidateOcInfoComponent } from './pages/validate-oc-info/validate-oc-info.component';
import { OcInfoErrorComponent } from './pages/oc-info-error/oc-info-error.component';
import { authoOcGuard } from './guards/auth-oc.guard';
import { OcFormsCmoComponent } from './pages/oc-forms-cmo/oc-forms-cmo.component';
import { OcFormSuccessComponent } from './components/oc-form-success/oc-form-success.component';
import { ExpirationErrorComponent } from './pages/expiration-error/expiration-error.component';

export const routes: Routes = [
    {
      path: '',
      component: InvoiceLodgingComponent,
    },
    {
      path: 'sent-oc',
      component: SendOcComponent
    },
    {
      path: 'validate-oc',
      component: ValidateOcInfoComponent
    },
    {
      path: 'oc-forms/:id',
      canActivate: [authoOcGuard],
      component: OcFormsCmoComponent
    },
    {
      path: 'oc-forms-cmo/success/:registerId',
      component: OcFormSuccessComponent,
    },
    {
      path: 'oc-error',
      component: OcInfoErrorComponent
    },
    {
      path: 'expiration-error',
      component: ExpirationErrorComponent
    },
    {
      path: ':registerId',
      component: ValidateOcInfoComponent
    },
		{
			path: '**',
			component: PageNotFoundComponent
		},
];
