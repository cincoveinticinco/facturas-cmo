import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthOcService {
  
  private loginApiUrl: string = environment.apiUrlFront;
 
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private http: HttpClient, private router: Router, private route: ActivatedRoute) { }

  async getSession() {
    let sessionToken = await this.getToken();
    console.log(sessionToken);
    if (sessionToken) return true;
    else return false;
  }

  async getToken() {
    const value = localStorage.getItem('id_vendor_oc_token');
    return value;
  }

  getValueToken() {
    const value = localStorage.getItem('id_vendor_oc_token');
    if (value)
    return value;
    else return null;
  }

  logOut() {
    this.route.params.subscribe((params: any) => {
      localStorage.clear();
      window.location.href = this.loginApiUrl;
    })
  }
}
