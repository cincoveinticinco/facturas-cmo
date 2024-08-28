import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { VendorService } from '../../../services/vendor.service';
import { AuthService } from '../../../services/auth.service';
import { VENDORFORMSTATUS } from '../../../shared/interfaces/typo_vendor_form_status';
import { PanelButtonsComponent } from '../../molecules/panel-buttons/panel-buttons.component';
import { LogoComponent } from '../../atoms/logo/logo.component';

@Component({
  selector: 'app-thanks',
  standalone: true,
  imports: [RouterModule, PanelButtonsComponent, LogoComponent],
  templateUrl: './thanks.component.html',
  styleUrl: './thanks.component.css'
})
export class ThanksComponent implements OnInit{

  readonly VENDORFORMSTATUS = VENDORFORMSTATUS;

  vendorId: any = null;
  loading: boolean = false;
  vendor: any = null;
  typeRoute: string = '';

  constructor(private route: ActivatedRoute, private _cS: VendorService, private auth: AuthService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.vendorId = params.id;
      this.typeRoute = this.route.snapshot.data['type'];
    })
  }


}
