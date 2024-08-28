import { Component, Input } from '@angular/core';
import { SubtitleComponent } from '../../atoms/subtitle/subtitle.component';
import { TextInputComponent } from '../../atoms/text-input/text-input.component';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-informacion-financiera',
  standalone: true,
  imports: [
    SubtitleComponent,
    TextInputComponent
  ],
  templateUrl: './informacion-financiera.component.html',
  styleUrl: './informacion-financiera.component.css'
})
export class InformacionFinancieraComponent {
  @Input() form: FormGroup | undefined;
  
  getControl(controlName: string): FormControl {
    return this.form?.get(controlName) as FormControl;
  }
}
