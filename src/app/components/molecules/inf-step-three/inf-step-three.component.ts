import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SubtitleComponent } from '../../atoms/subtitle/subtitle.component';
import { FileboxComponent } from '../../atoms/filebox/filebox.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inf-step-three',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    SubtitleComponent,
    FileboxComponent,
    CommonModule
  ],
  templateUrl: './inf-step-three.component.html',
  styleUrl: './inf-step-three.component.css'
})
export class InfStepThreeComponent {
  @Input() invoiceNaturalForm!: FormGroup;
  @Input() vendorInfo: any;
  @Output() formSubmit = new EventEmitter<void>();
  @Output() previousStep = new EventEmitter<void>();

  dependentsInfo: FormArray | undefined;


  onSubmit() {
    this.formSubmit.emit();
  }

  ngOnInit() {
    if(this.invoiceNaturalForm?.get('otherAnexes')?.value.length === 0) {
      this.addNewAnexFormGroup();
    }
    this.dependentsInfo= this.invoiceNaturalForm?.get('dependentsInfo') as FormArray;
  }

  getControl(controlName: string): any {
    return this.invoiceNaturalForm?.get(controlName) as FormControl;
  }

  getOtherAnexesArray(): FormArray {
    return this.invoiceNaturalForm.get('otherAnexes') as FormArray;
  }

  getOtherAnexesControls() {
    return this.getOtherAnexesArray().controls as FormControl[];
  }

  addNewAnexFormGroup() {
    this.getOtherAnexesArray().push(new FormControl('', [Validators.required]));
  }

  handlePreviousStep() {
    this.previousStep.emit();
  }

  deleteAnnex(index: number) {
    this.getOtherAnexesArray().removeAt(index);
  }

  thereArePrechargedDocs(): boolean {
    const controlsToCheck = [
      'socialSecurity',
      'afcContributionsFile',
      'pensionContributionsFile',
      'medicalPrepaidFile',
      'housingCreditFile'
    ];

    for (const control of controlsToCheck) {
      if (this.getControl(control)?.value?.url) {
        return true;
      }
    }

    if (this.dependentsInfo && this.dependentsInfo.length > 0) {
      for (const dependent of this.dependentsInfo.controls) {
        const dependentControlsToCheck = [
          'minorChildrenFile',
          'childrenStudyCertificateFile',
          'childrenMedicineCertificateFile',
          'partnerMedicineCertificateFile',
          'familyMedicineCertificateFile'
        ];
        for (const control of dependentControlsToCheck) {
          if (dependent.get(control)?.value?.url) {
            return true;
          }
        }
      }
    }

    if (this.getOtherAnexesControls().length > 0) {
      for (const anexo of this.getOtherAnexesControls()) {
        if (anexo.value?.url) {
          return true;
        }
      }
    }

    return false;
  }
}
