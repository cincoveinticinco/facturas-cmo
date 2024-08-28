import { Component, Input } from '@angular/core';
import { SubtitleComponent } from '../../atoms/subtitle/subtitle.component';
import { TextInputComponent } from '../../atoms/text-input/text-input.component';
import { SelectInputComponent } from '../../atoms/select-input/select-input.component';
import { FormControl, FormGroup } from '@angular/forms';
import { TIPODOCUMENTO } from '../../../shared/interfaces/typo_documentos';

@Component({
  selector: 'app-datos-contratista',
  standalone: true,
  imports: [
    SubtitleComponent,
    SelectInputComponent,
    TextInputComponent
  ],
  templateUrl: './datos-contratista.component.html',
  styleUrl: './datos-contratista.component.css'
})
export class DatosContratistaComponent {
  @Input() form: FormGroup | undefined;
  @Input() lists: any = {};

  addressRegexp = /^[a-zA-Z0-9\s]+$/;

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

  showPepff() {
    return this.form?.get('document_type_id')?.value == TIPODOCUMENTO.CE || this.form?.get('document_type_id')?.value == TIPODOCUMENTO.PASAPORTE;
  }
}
