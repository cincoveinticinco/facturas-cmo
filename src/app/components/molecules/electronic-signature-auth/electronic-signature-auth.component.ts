import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SubtitleComponent } from '../../atoms/subtitle/subtitle.component';
import { TextInputComponent } from '../../atoms/text-input/text-input.component';

@Component({
  selector: 'app-electronic-signature-auth',
  standalone: true,
  imports: [ReactiveFormsModule, SubtitleComponent, TextInputComponent],
  templateUrl: './electronic-signature-auth.component.html',
  styleUrl: './electronic-signature-auth.component.css'
})
export class ElectronicSignatureAuthComponent {
  @Input() form: FormGroup | undefined;
  @Input() controlNames: {
    signatureAuth: string,
    signature: string
  } = {
    signatureAuth: 'signatureAuth',
    signature: 'signature'
  };

  getControl(controlName: string) {
    return this.form?.get(controlName) as FormControl;
  }

  getValue(controlName: string) {
    return this.form?.get(controlName)?.value;
  }

  capitalizeString(str: string) {
    const stringArr = str.split(' ');
    // Capitalize first letter of each word and lowercase the rest
    return stringArr.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
  }
}
