import { Component, Input } from '@angular/core';
import { CheckboxInputComponent } from '../../atoms/checkbox-input/checkbox-input.component';
import { TextInputComponent } from '../../atoms/text-input/text-input.component';
import { SubtitleComponent } from '../../atoms/subtitle/subtitle.component';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-datos-contables-fiscales',
  standalone: true,
  imports: [
    CheckboxInputComponent,
    TextInputComponent,
    SubtitleComponent
  ],
  templateUrl: './datos-contables-fiscales.component.html',
  styleUrl: './datos-contables-fiscales.component.css'
})
export class DatosContablesFiscalesComponent {
  @Input() form: FormGroup | undefined;
  
  getControl(controlName: string): FormControl {
    return this.form?.get(controlName) as FormControl;
  }
}
