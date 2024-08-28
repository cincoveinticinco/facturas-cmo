import { Component, Input } from '@angular/core';
import { SubtitleComponent } from '../../atoms/subtitle/subtitle.component';
import { TextInputComponent } from '../../atoms/text-input/text-input.component';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-datos-financieros',
  standalone: true,
  imports: [
    SubtitleComponent,
    TextInputComponent,
  ],
  templateUrl: './datos-financieros.component.html',
  styleUrl: './datos-financieros.component.css'
})
export class DatosFinancierosComponent {
  @Input() form: FormGroup | undefined;
  
  getControl(controlName: string): FormControl {
    return this.form?.get(controlName) as FormControl;
  }
}
