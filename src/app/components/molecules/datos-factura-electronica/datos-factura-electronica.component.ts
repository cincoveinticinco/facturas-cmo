import { Component, Input } from '@angular/core';
import { TextInputComponent } from '../../atoms/text-input/text-input.component';
import { SelectInputComponent } from '../../atoms/select-input/select-input.component';
import { SubtitleComponent } from '../../atoms/subtitle/subtitle.component';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-datos-factura-electronica',
  standalone: true,
  imports: [
    TextInputComponent,
    SelectInputComponent,
    SubtitleComponent,
  ],
  templateUrl: './datos-factura-electronica.component.html',
  styleUrl: './datos-factura-electronica.component.css'
})
export class DatosFacturaElectronicaComponent {
  @Input() form: FormGroup | undefined;
  
  getControl(controlName: string): FormControl {
    return this.form?.get(controlName) as FormControl;
  }
}
