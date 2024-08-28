import { Component, Input } from '@angular/core';
import { SubtitleComponent } from '../../atoms/subtitle/subtitle.component';
import { SelectInputComponent } from '../../atoms/select-input/select-input.component';
import { CheckboxInputComponent } from '../../atoms/checkbox-input/checkbox-input.component';
import { FormControl, FormGroup } from '@angular/forms';
import { TextInputComponent } from '../../atoms/text-input/text-input.component';

@Component({
  selector: 'app-datos-fiscales',
  standalone: true,
  imports: [
    SubtitleComponent,
    SelectInputComponent,
    CheckboxInputComponent,
    TextInputComponent
  ],
  templateUrl: './datos-fiscales.component.html',
  styleUrl: './datos-fiscales.component.css'
})
export class DatosFiscalesComponent {
  @Input() form: FormGroup | undefined;
  @Input() lists: any = {};

  ngOnInit() {
    this.form?.controls['economic_activity'].disable();
  }

  getControl(controlName: string): FormControl {
    return this.form?.get(controlName) as FormControl;
  }

  getEconomicActivity(id: number) {
    return this.lists.economicActivities.find((ea: any) => ea.id == id)?.economic_activity;
  }

  setEconomicActivity(event: any) {
    let id = event.target?.value;
    if(id) {
      this.form?.get('economic_activity')?.setValue(this.getEconomicActivity(id));
    }
  }
}
