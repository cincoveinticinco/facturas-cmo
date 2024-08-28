import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TextInputComponent } from '../../atoms/text-input/text-input.component';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-initial-data',
  standalone: true,
  imports: [
    TextInputComponent,
  ],
  templateUrl: './initial-data.component.html',
  styleUrls: ['./initial-data.component.css']
})
export class InitialDataComponent {
  @Input() form: FormGroup | undefined;

  getControl(controlName: string): FormControl {
    return this.form?.get(controlName) as FormControl;
  }
}

