import { Component, Input } from '@angular/core';
import { TextInputComponent } from '../../atoms/text-input/text-input.component';
import { FileboxComponent } from '../../atoms/filebox/filebox.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-firma',
  standalone: true,
  imports: [
    TextInputComponent,
    FileboxComponent,
    ReactiveFormsModule
  ],
  templateUrl: './firma.component.html',
  styleUrl: './firma.component.css'
})
export class FirmaComponent {
  @Input() form: FormGroup | undefined;

  getControl(controlName: string): FormControl {
    return this.form?.get(controlName) as FormControl;
  }
}
