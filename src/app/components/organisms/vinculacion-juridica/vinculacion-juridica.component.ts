import { Component, ElementRef, EventEmitter, HostListener, Input,  Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InitialDataComponent } from '../../molecules/initial-data/initial-data.component';
import { BlackButtonComponent } from '../../atoms/black-button/black-button.component';
import { DatosEmpresaComponent } from '../../molecules/datos-empresa/datos-empresa.component';
import { DatosRepresentanteLegalComponent } from '../../molecules/datos-representante-legal/datos-representante-legal.component';
import { DatosFacturaElectronicaComponent } from '../../molecules/datos-factura-electronica/datos-factura-electronica.component';
import { DatosContabilidadComponent } from '../../molecules/datos-contabilidad/datos-contabilidad.component';
import { DatosFiscalesComponent } from '../../molecules/datos-fiscales/datos-fiscales.component';
import { DatosTesoreriaComponent } from '../../molecules/datos-tesoreria/datos-tesoreria.component';
import { DatosContactoComercialComponent } from '../../molecules/datos-contacto-comercial/datos-contacto-comercial.component';
import { DatosFinancierosComponent } from '../../molecules/datos-financieros/datos-financieros.component';
import { AutorizacionDatosPersonalesComponent } from '../../molecules/autorizacion-datos-personales/autorizacion-datos-personales.component';
import { PersonasExpuestasPoliticamenteComponent } from '../../molecules/personas-expuestas-politicamente/personas-expuestas-politicamente.component';
import { DeclaracionPepComponent } from '../../molecules/declaracion-pep/declaracion-pep.component';
import { DeclaracionSagrilaftComponent } from '../../molecules/declaracion-sagrilaft/declaracion-sagrilaft.component';
import { AcuerdoConfidencialidadComponent } from '../../molecules/acuerdo-confidencialidad/acuerdo-confidencialidad.component';
import { InformacionFinancieraComponent } from '../../molecules/informacion-financiera/informacion-financiera.component';
import { PersonaDiligenciaFormularioComponent } from '../../molecules/persona-diligencia-formulario/persona-diligencia-formulario.component';
import { PanelButtonsComponent } from '../../molecules/panel-buttons/panel-buttons.component';
import { GlobalService } from '../../../services/global.service';
import { VendorService } from '../../../services/vendor.service';
import { file_types } from '../../../shared/interfaces/files_types';
import { Subscription } from 'rxjs';
import { AdditionalInfoComponent } from '../../molecules/additional-info/additional-info.component';
import { AUTOCOMPLETE_CONTROLS } from '../../../shared/interfaces/autocomplete_controls';
import { ServiceProviderDataComponent } from "../../molecules/service-provider-data/service-provider-data.component";

@Component({
  selector: 'app-vinculacion-juridica',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    InitialDataComponent,
    BlackButtonComponent,
    DatosEmpresaComponent,
    DatosRepresentanteLegalComponent,
    DatosFacturaElectronicaComponent,
    DatosContabilidadComponent,
    DatosFiscalesComponent,
    DatosTesoreriaComponent,
    DatosContactoComercialComponent,
    DatosFinancierosComponent,
    AutorizacionDatosPersonalesComponent,
    PersonasExpuestasPoliticamenteComponent,
    DeclaracionPepComponent,
    DeclaracionSagrilaftComponent,
    AcuerdoConfidencialidadComponent,
    InformacionFinancieraComponent,
    PersonaDiligenciaFormularioComponent,
    PanelButtonsComponent,
    AdditionalInfoComponent,
    ServiceProviderDataComponent
],
  templateUrl: './vinculacion-juridica.component.html',
  styleUrls: ['./vinculacion-juridica.component.css']
})
export class VinculacionJuridicaComponent {
  juridicaForm: FormGroup;
  @Input() lists: any = {};

  @Output() notify: EventEmitter<any> = new EventEmitter();
  @Output() save: EventEmitter<any> = new EventEmitter();
  @Output() onSubmitFile: EventEmitter<any> = new EventEmitter();

  subs: Subscription[] = [];

  constructor(private fb: FormBuilder, private _gS: GlobalService, private _vS: VendorService, private el: ElementRef) {
    this.juridicaForm = this.fb.group({
      type: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      document: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      telephone: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      legal_representative_name: new FormControl('', [Validators.required]),
      f_document_representative: new FormControl('', [Validators.required]),
      legal_representative_telephone: new FormControl('', [Validators.required]),
      legal_representative_email: new FormControl('', [Validators.required, Validators.email]),
      electronic_billing_name: new FormControl('', [Validators.required]),
      electronic_billing_email: new FormControl('', [Validators.required, Validators.email]),
      electronic_billing_telephone: new FormControl('', [Validators.required]),
      accounting_responsible_name: new FormControl('', [Validators.required]),
      accounting_responsible_telephone: new FormControl('', [Validators.required]),
      accounting_responsible_email: new FormControl('', Validators.email),
      accounting_responsible_position: new FormControl(''),
      ciiu: new FormControl(''),
      economic_activity_id: new FormControl('', [Validators.required]),
      economic_activity: new FormControl('', [Validators.required]),
      simple_regime: new FormControl('', [Validators.required]),
      self_withholding: new FormControl('', [Validators.required]),
      big_contributor: new FormControl('', [Validators.required]),
      treassury_responsible_name: new FormControl('', [Validators.required]),
      treassury_responsible_telephone: new FormControl('', [Validators.required]),
      treassury_responsible_email: new FormControl('', [Validators.required, Validators.email]),
      treassury_responsible_position: new FormControl('', [Validators.required]),
      commercial_responsible_name: new FormControl('', [Validators.required]),
      commercial_responsible_telephone: new FormControl('', [Validators.required]),
      commercial_responsible_email: new FormControl('', [Validators.required, Validators.email]),
      last_close_assets: new FormControl('', [Validators.required]),
      last_year_assets: new FormControl('', [Validators.required]),
      last_close_liabilities: new FormControl('', [Validators.required]),
      last_year_liabilities: new FormControl('', [Validators.required]),
      last_close_income: new FormControl('', [Validators.required]),
      last_year_income: new FormControl('', [Validators.required]),
      last_close_equity: new FormControl('', [Validators.required]),
      last_year_equity: new FormControl('', [Validators.required]),
      last_close_expense: new FormControl('', [Validators.required]),
      last_year_expenses: new FormControl('', [Validators.required]),
      is_pep: new FormControl('', [Validators.required]),
      pep_start_date: new FormControl({ value: null, disabled: true }, Validators.required),
      pep_end_date: new FormControl({ value: null, disabled: true }, Validators.required),
      pep_position: new FormControl({ value: '', disabled: true }, Validators.required),
      pep_term: new FormControl({ value: '', disabled: true }, Validators.required),
      confidential_responsible_address: new FormControl('', [Validators.required]),
      confidential_responsible_email: new FormControl('', [Validators.required, Validators.email]),
      form_responsible_name: new FormControl('', [Validators.required]),
      form_responsible_document: new FormControl('', [Validators.required]),
      form_responsible_position: new FormControl('', [Validators.required]),
      signature: new FormControl('', [Validators.required]),
      cv_link: new FormControl(''),
      responsible_responsibles_name: new FormControl('', [Validators.required]),
      responsible_responsibles_document: new FormControl('', [Validators.required]),
      responsible_responsibles_email: new FormControl('', [Validators.required, Validators.email]),
      responsible_f_document_type_id: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    this.subscribeToFormChanges();
    this.setAutoSave();
  }

  subscribeToFormChanges() {
    Object.keys(this.juridicaForm.controls).forEach(controlName => {
      const control = this.juridicaForm.get(controlName);
      if (control) {
        const sub = control.valueChanges.subscribe(value => {
          if (control) {
            const foundKey = Object.keys(file_types).find((key: any) => file_types[key] === controlName);
            if (foundKey) {
              const fileData = {
                formControlName: controlName,
                value: value?.file,
                vendor_id: this._vS.getVendorId()
              };
              this.onSubmitFile.emit(fileData);
              control.markAsPristine();
            }
          }
        });
        this.subs.push(sub);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['lists'] && this.lists.vendorInfo && this.juridicaForm) {
      this._gS.fillInitialVinculationForm(this.juridicaForm, this.lists.vendorInfo);
      this.juridicaForm.get('date')?.setValue(this._gS.formatDate(this.lists.vendorInfo.created_at));
      this.juridicaForm.controls['date'].disable();
      this.juridicaForm.get('type')?.setValue('VINCULACION PERSONA JURIDICA');
      this.juridicaForm.controls['type'].disable();
    }
  }

  @HostListener('submit', ['$event'])
  onFormSubmit() {
    const invalidElements = this.el.nativeElement.querySelectorAll('.ng-invalid:not(.ng-submitted)');
    if (invalidElements.length > 0) {
      invalidElements[0].focus();
    }
  }

  sendForm() {
    if (this.juridicaForm.valid) {
      let data = {
        form: this.juridicaForm.value,
        nextForm: true
      }
      this.notify.emit(data);
    } else {
      Object.values(this.juridicaForm.controls).forEach((control) => {
        control.markAsTouched();
      });
    }
  }

  saveForm() {
    let data = {
      form: this.juridicaForm.value,
      nextForm: false
    }
    this.notify.emit(data);
  }

  logFormErrors(form: FormGroup) {
    Object.keys(form.controls).forEach(key => {
      const controlErrors = form.get(key)?.errors;
      if (controlErrors) {
        console.log(`Control: ${key}, Errors:`, controlErrors);
      }
    });
  }

  setAutoSave() {
    AUTOCOMPLETE_CONTROLS.forEach(control => {
      this.juridicaForm.get(control.controlName)?.valueChanges?.subscribe((value) => {
        this.lists.vendorInfo[control.controlName] = value;

        if (control?.autocompleteControlName) {
          this.juridicaForm.get(control?.autocompleteControlName)?.setValue(value);
        }
      });
    });
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

}