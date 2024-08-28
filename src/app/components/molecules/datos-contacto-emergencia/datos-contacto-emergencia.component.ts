import { Component, Input } from '@angular/core';
import { SubtitleComponent } from '../../atoms/subtitle/subtitle.component';
import { TextInputComponent } from '../../atoms/text-input/text-input.component';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-datos-contacto-emergencia',
  standalone: true,
  imports: [
    SubtitleComponent,
    TextInputComponent
  ],
  templateUrl: './datos-contacto-emergencia.component.html',
  styleUrl: './datos-contacto-emergencia.component.css'
})
export class DatosContactoEmergenciaComponent {
  @Input() form: FormGroup | undefined;
  
  getControl(controlName: string): FormControl {
    return this.form?.get(controlName) as FormControl;
  }
}
