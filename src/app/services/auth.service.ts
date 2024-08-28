import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from './../../environments/environment';
import { shareReplay, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private loginApiUrl: string = environment.apiUrlFront;
  vendorId: any = null;
 
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private http: HttpClient, private router: Router, private route: ActivatedRoute) { }
 
  loginVendor(email: string, token: string, vendor_id: any){
    return this.http.post(`${environment.apiUrl}cmo/validate_token`, {token: token, email: email, id: vendor_id}).pipe(
      tap( res => this.setVendorSession(res)),
      shareReplay(1)
    )
  }

  private setVendorSession(authResult: any){
    localStorage.setItem('id_vendor_token', authResult.vendor_token);
  }

  generateVendorToken(email_vendor: any) {
    return this.http.post(`${environment.apiUrl}cmo/send_token`, {email: email_vendor}).pipe(
      shareReplay(1)
    )
  } 

  async getSession() {
    let sessionToken = await this.getToken();
    if (sessionToken) return true;
    else return false;
  }

  async getToken() {
    const value = localStorage.getItem('id_vendor_token');
    return value;
  }

  getValueToken() {

      const value = localStorage.getItem('id_vendor_token');
      if (value)
      return value;
      else return null;
  }

  logOut(vendorId: any) {
    this.route.params.subscribe((params: any) => {
      this.vendorId = params.id;
      localStorage.clear();
      window.location.href = this.loginApiUrl + 'home/' + vendorId;
    })
  }
}
