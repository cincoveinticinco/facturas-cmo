import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SubtitleComponent } from '../../atoms/subtitle/subtitle.component';
import { TextInputComponent } from '../../atoms/text-input/text-input.component';
import { SelectInputComponent } from '../../atoms/select-input/select-input.component';

@Component({
  selector: 'app-service-provider-data',
  standalone: true,
  imports: [
    SubtitleComponent,
    TextInputComponent,
    SelectInputComponent,
  ],
  templateUrl: './service-provider-data.component.html',
  styleUrl: './service-provider-data.component.css'
})
export class ServiceProviderDataComponent {

  @Input() form: FormGroup | undefined;
  @Input() lists: any = {};

  getControl(controlName: string): FormControl {
    return this.form?.get(controlName) as FormControl;
  }
}
