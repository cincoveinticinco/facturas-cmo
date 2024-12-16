import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs';
import { AuthOcService } from './auth-oc.service';
import { OcNaturalParams } from '../shared/interfaces/natural_params_form.interface';

@Injectable({
  providedIn: 'root'
})
export class InvoiceLodgingService {

  tokenSession: any = null;
  vendorId: any = null;
  private headers: HttpHeaders | undefined;

  constructor(private http: HttpClient, private auth: AuthOcService) { }

  setHeaders() {
    this.tokenSession = this.auth.getValueToken();
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.tokenSession}`
    });
  }

  getDocumentTypes() {
    return this.http.get(`${environment.apiUrl}cmo/get_document_types`);
  }

  saveSession(tokenSession: string) {
    localStorage.setItem('id_vendor_oc_token', tokenSession);
  }

  // This function will retrieve three keys, purchaseOrders that haves an array of purchaseOrders ids, vendorEmail and the status of the request
  getPurchaseOrders(vendorDocument: number, requestType: string) {
    // send in params vendor_document
    return this.http.get(`${environment.apiUrl}cmo/get_purchase_orders`, {
      params: {
        vendor_document: vendorDocument.toString(), 
        f_request_has_project_types_id: requestType
      }
    });
  }

  sendPurchaseOrdersToEmail(formValues: {
    email: string,
    purchaseOrdersIds: string,
    document: number
  }) {
    return this.http.get(`${environment.apiUrl}cmo/send_purchase_orders_email`, {
      params: {
        email: formValues.email,
        purchase_orders_ids: formValues.purchaseOrdersIds,
        document: formValues.document.toString()
      }
    });
  }
  getVendorId() {
    return localStorage.getItem('id_vendor_oc_id');
  }

  getPresignedPutURLOc(filename: string, vendor_id: string, folder?: string ) {
    this.setHeaders();
    let params = {
			'filename': filename,
			'vendor_id': vendor_id,
      'folder': folder
		};
		return this.http
			.post(`${environment.apiUrl}finance/getPresignedUrlService`, params, { headers: this.headers })
			.pipe(map(response => response));
  }

  authenticateUser(form: {
    documentType: string,
    documentNumber: string,
    orderNumber: string,
    requestType: string
  }) {
    const params = {
      f_document_type_id: form.documentType,
      document_number: form.documentNumber,
      order_number: form.orderNumber,
      f_request_has_project_types_id: form.requestType
    }

    return this.http.get(`${environment.apiUrl}cmo/authenticate_oc_user`, {
      params
    }).pipe(
      tap((res: any) => {
        if(res.status === 200) {
          this.saveSession(res.vendor_token);
          localStorage.setItem('id_vendor_oc_id', res.vendor_id);
        }
      })
    )
  }

  authenticateUserWithRegisterId(registerId: string) {
    const params = {
      register_id: registerId
    }

    return this.http.get(`${environment.apiUrl}cmo/authenticate_oc_user`, {
      params
    }).pipe(
      tap((res: any) => {
        if(res.status === 200) {
          this.saveSession(res.vendor_token);
          localStorage.setItem('id_vendor_oc_id', res.vendor_id);
        }
      })
    )
  }

  getFormInitialData() {
    this.setHeaders();
    return this.http.get(`${environment.apiUrl}cmo/get_form_initial_data`, {
      headers: this.headers
    });
  }

  radicateVendorRegister(register_id: string) {
    this.setHeaders();
    const params = {
      register_id
    }
    return this.http.post(`${environment.apiUrl}cmo/radicate_vendor_register`, params, {
      headers: this.headers
    });

  }

  updateRegisterVendor(formParams: OcNaturalParams) {
    this.setHeaders();
    const params = formParams;

    return this.http.post(`${environment.apiUrl}cmo/update_register`, params, {
      headers: this.headers
    });
  }

  signUrl(document: any) {
    this.setHeaders();
    let params = {
      'document': document,
    }

    return this.http.get(`${environment.apiUrl}cmo/sign_document`, { 
      headers: this.headers,
      params: params
    }).pipe(
      map((response: any) => response));
  }

}