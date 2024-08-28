import { Component, Input } from '@angular/core';
import { LogoComponent } from '../atoms/logo/logo.component';
import { Router } from '@angular/router';
import { GlobalService } from '../../services/global.service';
import { AuthOcService } from '../../services/auth-oc.service';

@Component({
  selector: 'app-oc-form-success',
  standalone: true,
  imports: [LogoComponent],
  templateUrl: './oc-form-success.component.html',
  styleUrl: './oc-form-success.component.css'
})
export class OcFormSuccessComponent {
  radicado: string = '';
  url: string = '';

  ngOnInit() {
    this.getRadicado();
  }

  constructor(
    private auth: AuthOcService
  ) {}

  getRadicado() {
    const radicadoState = window.history.state.radicado;
    const urlState = window.history.state.url;
    if (radicadoState) {
      this.radicado = radicadoState;
    }
    if (urlState) {
      this.url = urlState;
    }
  }
  goToHome() {
    this.auth.logOut();
  }
}
