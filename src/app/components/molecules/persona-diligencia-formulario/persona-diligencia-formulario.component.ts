import { Component, Input } from '@angular/core';
import { SubtitleComponent } from '../../atoms/subtitle/subtitle.component';
import { TextInputComponent } from '../../atoms/text-input/text-input.component';
import { FileboxComponent } from '../../atoms/filebox/filebox.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-persona-diligencia-formulario',
  standalone: true,
  imports: [
    SubtitleComponent,
    TextInputComponent,
    FileboxComponent,
    ReactiveFormsModule
  ],
  templateUrl: './persona-diligencia-formulario.component.html',
  styleUrl: './persona-diligencia-formulario.component.css'
})
export class PersonaDiligenciaFormularioComponent {
  @Input() form: FormGroup | undefined;
  
  getControl(controlName: string): FormControl {
    return this.form?.get(controlName) as FormControl;
  }
}
