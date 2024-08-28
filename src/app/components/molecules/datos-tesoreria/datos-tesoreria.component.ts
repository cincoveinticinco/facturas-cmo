import { Component, Input } from '@angular/core';
import { TextInputComponent } from '../../atoms/text-input/text-input.component';
import { SubtitleComponent } from '../../atoms/subtitle/subtitle.component';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-datos-tesoreria',
  standalone: true,
  imports: [
    TextInputComponent,
    SubtitleComponent
  ],
  templateUrl: './datos-tesoreria.component.html',
  styleUrl: './datos-tesoreria.component.css'
})
export class DatosTesoreriaComponent {
  @Input() form: FormGroup | undefined;

  getControl(controlName: string): FormControl {
    return this.form?.get(controlName) as FormControl;
  }
}
