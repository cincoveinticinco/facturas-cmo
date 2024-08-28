import { Component, Input } from '@angular/core';
import { SubtitleComponent } from '../../atoms/subtitle/subtitle.component';
import { TextInputComponent } from '../../atoms/text-input/text-input.component';
import { SelectInputComponent } from '../../atoms/select-input/select-input.component';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-datos-representante-legal',
  standalone: true,
  imports: [
    SubtitleComponent,
    TextInputComponent,
    SelectInputComponent,
  ],
  templateUrl: './datos-representante-legal.component.html',
  styleUrl: './datos-representante-legal.component.css'
})
export class DatosRepresentanteLegalComponent {
  @Input() form: FormGroup | undefined;
  
  getControl(controlName: string): FormControl {
    return this.form?.get(controlName) as FormControl;
  }
}
