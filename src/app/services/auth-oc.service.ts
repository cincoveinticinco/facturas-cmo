import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthOcService {
  
  private loginApiUrl: string = environment.apiUrlFront;
 
  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { }

  async getSession() {
    let sessionToken = await this.getToken();
    if (sessionToken) return true;
    else return false;
  }

  async getToken() {
    const value = sessionStorage.getItem('id_vendor_oc_token');
    return value;
  }

  getValueToken() {
    const value = sessionStorage.getItem('id_vendor_oc_token');
    if (value)
    return value;
    else return null;
  }

  logOut() {
    this.route.params.subscribe((params: any) => {
      sessionStorage.clear();
      window.location.href = this.loginApiUrl;
    })
  }
}
