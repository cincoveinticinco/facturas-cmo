import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SubtitleComponent } from '../../atoms/subtitle/subtitle.component';
import { TextInputComponent } from '../../atoms/text-input/text-input.component';
import { SelectInputComponent } from '../../atoms/select-input/select-input.component';
import { CheckboxInputComponent } from '../../atoms/checkbox-input/checkbox-input.component';
import { FileboxComponent } from '../../atoms/filebox/filebox.component';
import { InvoiceLodgingService } from '../../../services/invoiceLodging.service';
import { TIPODOCUMENTO } from '../../../shared/interfaces/typo_documentos';

@Component({
  selector: 'app-inf-dependent-certification',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    SubtitleComponent,
    TextInputComponent,
    SelectInputComponent,
    CheckboxInputComponent,
    FileboxComponent
  ],
  templateUrl: './inf-dependent-certification.component.html',
  styleUrl: './inf-dependent-certification.component.css'
})
export class InfdependentCertificationComponent {

  @Input() dependentForm!: FormGroup;
  @Input() loading: boolean = false;
  @Input() dependentIndex: number = 0;
  @Input() notRequiredDocuments: boolean = false;

  documentTypesOptions: any = [];

  constructor(private ils: InvoiceLodgingService) {}

  ngOnInit() {
    this.scrollToTop();
    this.ils.getDocumentTypes().subscribe((response: any) => {
      this.documentTypesOptions = response;
    });
  }

  private scrollToTop() {
    window.scrollTo(0, 0);
  }

  getControl(controlName: string) {
    return this.dependentForm.get(controlName) as FormControl
  }

  getValue(controlName: string) {
    return this.dependentForm.get(controlName)?.value;
  }

  getDocumentPattern() {
    return this.getControl('dependentDocumentTypeId').value.toString() !== TIPODOCUMENTO.NIT.toString() ? '^[0-9]*$' : '^[0-9]{1,9}$';
  }
}
