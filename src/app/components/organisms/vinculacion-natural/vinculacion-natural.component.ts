import { Component, HostListener } from '@angular/core';
import { InitialDataComponent } from '../../molecules/initial-data/initial-data.component';
import { DatosEmpresaComponent } from '../../molecules/datos-empresa/datos-empresa.component';
import { DatosContratistaComponent } from '../../molecules/datos-contratista/datos-contratista.component';
import { DatosContablesFiscalesComponent } from '../../molecules/datos-contables-fiscales/datos-contables-fiscales.component';
import { DatosSaludComponent } from '../../molecules/datos-salud/datos-salud.component';
import { DatosContactoEmergenciaComponent } from '../../molecules/datos-contacto-emergencia/datos-contacto-emergencia.component';
import { PersonasExpuestasPoliticamenteComponent } from '../../molecules/personas-expuestas-politicamente/personas-expuestas-politicamente.component';
import { DeclaracionPepComponent } from '../../molecules/declaracion-pep/declaracion-pep.component';
import { DeclaracionSagrilaftComponent } from '../../molecules/declaracion-sagrilaft/declaracion-sagrilaft.component';
import { AcuerdoConfidencialidadComponent } from '../../molecules/acuerdo-confidencialidad/acuerdo-confidencialidad.component';
import { AutorizacionDatosPersonalesComponent } from '../../molecules/autorizacion-datos-personales/autorizacion-datos-personales.component';
import { BlackButtonComponent } from '../../atoms/black-button/black-button.component';
import { FirmaComponent } from '../../molecules/firma/firma.component';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-vinculacion-natural',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    InitialDataComponent,
    DatosEmpresaComponent,
    DatosContratistaComponent,
    DatosContablesFiscalesComponent,
    DatosSaludComponent,
    DatosContactoEmergenciaComponent,
    PersonasExpuestasPoliticamenteComponent,
    DeclaracionPepComponent,
    DeclaracionSagrilaftComponent,
    AcuerdoConfidencialidadComponent,
    AutorizacionDatosPersonalesComponent,
    FirmaComponent,
    BlackButtonComponent
  ],
  templateUrl: './vinculacion-natural.component.html',
  styleUrl: './vinculacion-natural.component.css'
})
export class VinculacionNaturalComponent {
  naturalForm: FormGroup;

  constructor(private fb: FormBuilder) {

    this.naturalForm = this.fb.group({
      type: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      document_type: new FormControl('', [Validators.required]),
      document: new FormControl('', [Validators.required]),
      pepff: new FormControl('', [Validators.required]),
      ciiu: new FormControl('', [Validators.required]),
      economic_activity: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      department: new FormControl('', [Validators.required]),
      telephone: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      emergency_contact_name: new FormControl('', [Validators.required]),
      emergency_contact_telephone: new FormControl('', [Validators.required]),
      emergency_contact_kinship: new FormControl('', [Validators.required]),
      eps: new FormControl('', [Validators.required]),
      pension: new FormControl('', [Validators.required]),
      cesantias: new FormControl('', [Validators.required]),
      arl: new FormControl('', [Validators.required]),
      risk_level: new FormControl('', [Validators.required]),
      illness: new FormControl('', [Validators.required]),
      illness_description: new FormControl('', [Validators.required]),
      medicines: new FormControl('', [Validators.required]),
      medicines_description: new FormControl('', [Validators.required]),
      phobias: new FormControl('', [Validators.required]),
      phobias_description: new FormControl('', [Validators.required]),
      allergies: new FormControl('', [Validators.required]),
      allergies_description: new FormControl('', [Validators.required]),
      food_restrictions: new FormControl('', [Validators.required]),
      food_restrictions_description: new FormControl('', [Validators.required]),
      is_pep: new FormControl('', [Validators.required]),
      confidentiality_agreement_address: new FormControl('', [Validators.required]),
      confidentiality_agreement_email: new FormControl('', [Validators.required]),
      accountant_email: new FormControl('', [Validators.required]),
      income_tax_declarant: new FormControl('', [Validators.required]),
      dependents: new FormControl('', [Validators.required]),
      prepaid_medicine: new FormControl('', [Validators.required]),
      mortgage_credit: new FormControl('', [Validators.required]),
      voluntary_contributions: new FormControl('', [Validators.required]),
      afc_account: new FormControl('', [Validators.required]),
      vat_responsible: new FormControl('', [Validators.required]),
      simple_regime: new FormControl('', [Validators.required]),
    });
  }

  @HostListener('submit', ['$event'])
  onFormSubmit(event: Event) {
    event.preventDefault();
    if (this.naturalForm.valid) {
      return;
    } else {
      Object.values(this.naturalForm.controls).forEach((control) => {
        control.markAsTouched();
      });

      const invalidElements = document.querySelectorAll('.ng-invalid');
      if (invalidElements.length > 0) {
        invalidElements[0].scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }

  sendForm() {
    if (this.naturalForm.valid) {
      console.log(this.naturalForm.value);
    } else {
      console.log(this.naturalForm.value)
      Object.values(this.naturalForm.controls).forEach((control) => {
        control.markAsTouched();
      });
    }
  }
}
