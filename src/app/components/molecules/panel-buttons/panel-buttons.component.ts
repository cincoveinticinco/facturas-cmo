import { Component, EventEmitter, Input, Output, input } from '@angular/core';
import { BlackButtonComponent } from '../../atoms/black-button/black-button.component';
import { AuthService } from '../../../services/auth.service';
import { VendorService } from '../../../services/vendor.service';
import { AuthOcService } from '../../../services/auth-oc.service';

@Component({
  selector: 'app-panel-buttons',
  standalone: true,
  imports: [
    BlackButtonComponent,
  ],
  templateUrl: './panel-buttons.component.html',
  styleUrl: './panel-buttons.component.css'
})
export class PanelButtonsComponent {
  @Output() saveForm: EventEmitter<any> = new EventEmitter();
  @Input() isOc: boolean = false;
  constructor(private auth: AuthService, private _vS: VendorService, private authOc: AuthOcService) {}
  logOut() {
    if (!this.isOc) {
      this.auth.logOut(this._vS.getVendorId());
    } else {
      this.authOc.logOut();
    }
  }
}
