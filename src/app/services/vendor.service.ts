import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  tokenSession: any = null;
  private headers: HttpHeaders | undefined;
  private _generalForm: any = null;
  private _vendorId: any = null;
  private _documentsList: any[] = [];

  setGeneralForm(data: any) {
    this._generalForm = null;
    this._generalForm = data;
  }

  getGeneralForm() {
    return this._generalForm;
  }

  setVendorId(data: any) {
    this._vendorId = null;
    this._vendorId = data;
  }

  getVendorId() {
    return this._vendorId;
  }

  setDocumentsList(data: any[]) {
    this._documentsList = [];
    this._documentsList = data;
  }

  getDocumentsList() {
    return this._documentsList;
  }

  setHeaders() {
    this.tokenSession = this.auth.getValueToken();
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.tokenSession}`
    });
  }

  getHeaders() {
    return this.headers;
  }

  getVendorInfo() {
    this.setHeaders();
    return this.http.get(`${environment.apiUrl}cmo/get_detail_vendor`, {
      headers: this.headers,
    });
  }

  updateVendor(values: any) {
    this.setHeaders();
    return this.http.post(`${environment.apiUrl}cmo/update_vendor`, values, { headers: this.headers}).pipe(
      map((response: any) => response));
  }

  getVendorEmail(vendor_id: any) {
    return this.http.get(`${environment.apiUrl}cmo/get_vendor_id`, {
      params: new HttpParams()
        .set('id', vendor_id)
    });
  }

  getVinculationInfo(vendor_id: any) {
    this.setHeaders();
    return this.http.get(`${environment.apiUrl}cmo/getDetailVendorDocuments`, {
      headers: this.headers,
      params: new HttpParams()
        .set('vendor_id', vendor_id),
    });
  }
  setNextVendorStatus() {
    this.setHeaders();
    return this.http.put(`${environment.apiUrl}/cmo/set_next_status`, null, {
      headers: this.headers
    }).pipe(
      map((response: any) => response));
  }

  updateVinculation(values: any) {
    this.setHeaders();
    return this.http.post(`${environment.apiUrl}cmo/updateDetailVendorDocuments`, values, { headers: this.headers }).pipe(
      map((response: any) => response));
  }

  getDocumentsData() {
    this.setHeaders();
    return this.http.get(`${environment.apiUrl}cmo/get_required_documents_list`, {
      headers: this.headers,
      params: new HttpParams()
    });
  }

  getPresignedPutURL(filename: string, folder: string) {
    this.setHeaders();
    let params = {
			'filename': filename,
			'vendor_id': folder
		};
		return this.http
			.post(`${environment.apiUrl}finance/getPresignedUrlService`, params, { headers: this.headers })
			.pipe(map(response => response));
  }

  uploadFileUrlPresigned(file: any, uploadUrl: string, contentType:string): Observable<any> {
		const headers = new HttpHeaders({'Content-Type': contentType, 'Accept': '*/*'});
		const req = new HttpRequest(
			'PUT', uploadUrl, file, {
			headers: headers
		});
		return this.http.request(req);
	}

  updateVendorDocument(formData: any){
    this.setHeaders();
    return this.http.post(`${environment.apiUrl}cmo/add_document_vendor`, {...formData}, { headers: this.headers })
    .pipe(map( response => response))
  }

  deleteVendorDocument(formData: any) {
    this.setHeaders();

    return this.http.delete(`${environment.apiUrl}cmo/delete_document_vendor`, {
      headers: this.headers,
      params: formData
    })
    .pipe(map(response => response));
  }

  constructor(private http: HttpClient, private auth: AuthService) {
  }
}
