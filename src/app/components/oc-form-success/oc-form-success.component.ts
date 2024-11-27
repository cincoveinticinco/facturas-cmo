import { Component, Input } from '@angular/core';
import { LogoComponent } from '../atoms/logo/logo.component';
import { Router } from '@angular/router';
import { GlobalService } from '../../services/global.service';
import { AuthOcService } from '../../services/auth-oc.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-oc-form-success',
  standalone: true,
  imports: [LogoComponent, DatePipe],
  templateUrl: './oc-form-success.component.html',
  styleUrl: './oc-form-success.component.css'
})
export class OcFormSuccessComponent {
  radicado: string = '';
  url: string = '';
  date: string = '';

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
    if (window.history.state.date) {
      this.date = window.history.state.date;
    }
  }

  goToHome() {
    this.auth.logOut();
  }
}
