import { Component, Input } from '@angular/core';
import { TextInputComponent } from '../../atoms/text-input/text-input.component';
import { SelectInputComponent } from '../../atoms/select-input/select-input.component';
import { SubtitleComponent } from '../../atoms/subtitle/subtitle.component';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-datos-contabilidad',
  standalone: true,
  imports: [
    TextInputComponent,
    SelectInputComponent,
    SubtitleComponent,
  ],
  templateUrl: './datos-contabilidad.component.html',
  styleUrl: './datos-contabilidad.component.css'
})
export class DatosContabilidadComponent {
  @Input() form: FormGroup | undefined;
  
  getControl(controlName: string): FormControl {
    return this.form?.get(controlName) as FormControl;
  }
}
