import { Component, HostListener } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InitialDataComponent } from '../../molecules/initial-data/initial-data.component';
import { BlackButtonComponent } from '../../atoms/black-button/black-button.component';

@Component({
  selector: 'app-vinculacion-juridica',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    InitialDataComponent,
    BlackButtonComponent
  ],
  templateUrl: './vinculacion-juridica.component.html',
  styleUrls: ['./vinculacion-juridica.component.css']
})
export class VinculacionJuridicaComponent {
  juridicaForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.juridicaForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      tipoSolicitud: new FormControl('', [Validators.required]),
      fechaSolicitud: new FormControl('', [Validators.required])
    });
  }

  @HostListener('submit', ['$event'])
  onFormSubmit(event: Event) {
    event.preventDefault();
    if (this.juridicaForm.valid) {
      console.log(this.juridicaForm.value);
    } else {
      Object.values(this.juridicaForm.controls).forEach((control) => {
        control.markAsTouched();
      });

      const invalidElements = document.querySelectorAll('.ng-invalid');
      if (invalidElements.length > 0) {
        invalidElements[0].scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }

  setFormValue(controlName: string, value: string) {
    const control = this.juridicaForm.get(controlName);
    if (control) {
      control.setValue(value);
    }
  }

  sendForm() {
    if (this.juridicaForm.valid) {
      console.log(this.juridicaForm.value);
    } else {
      Object.values(this.juridicaForm.controls).forEach((control) => {
        control.markAsTouched();
      });
    }
  }

  getErrorMessage(controlName: string): string | null {
    const control = this.juridicaForm.get(controlName);
    if (control?.hasError('required')) {
      return 'Este campo es requerido';
    }
    return null;
  }
}
