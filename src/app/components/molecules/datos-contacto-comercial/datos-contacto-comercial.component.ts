import { Component, Input } from '@angular/core';
import { TextInputComponent } from '../../atoms/text-input/text-input.component';
import { SubtitleComponent } from '../../atoms/subtitle/subtitle.component';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-datos-contacto-comercial',
  standalone: true,
  imports: [
    TextInputComponent,
    SubtitleComponent,
  ],
  templateUrl: './datos-contacto-comercial.component.html',
  styleUrl: './datos-contacto-comercial.component.css'
})
export class DatosContactoComercialComponent {
  @Input() form: FormGroup | undefined;
  
  getControl(controlName: string): FormControl {
    return this.form?.get(controlName) as FormControl;
  }
}
