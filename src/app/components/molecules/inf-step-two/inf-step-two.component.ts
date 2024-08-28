import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SubtitleComponent } from '../../atoms/subtitle/subtitle.component';
import { TextInputComponent } from '../../atoms/text-input/text-input.component';
import { CheckboxInputComponent } from '../../atoms/checkbox-input/checkbox-input.component';
import { FileboxComponent } from '../../atoms/filebox/filebox.component';
import { ElectronicSignatureAuthComponent } from '../electronic-signature-auth/electronic-signature-auth.component';
import { InfdependentCertificationComponent } from '../inf-dependent-certification/inf-dependent-certification.component';

@Component({
  selector: 'app-inf-step-two',
  standalone: true,
  imports: [
    SubtitleComponent, 
    ReactiveFormsModule, 
    TextInputComponent, 
    CheckboxInputComponent, 
    SubtitleComponent,
    FileboxComponent,
    ElectronicSignatureAuthComponent,
    InfdependentCertificationComponent
  ],
  templateUrl: './inf-step-two.component.html',
  styleUrl: './inf-step-two.component.css'
})

export class InfStepTwoComponent implements OnInit {
  @Input() invoiceNaturalForm!: FormGroup;
  @Input() vendorInfo: any;
  @Input() validateStep: any;
  @Input() loading: boolean = false;
  @Output() formSubmit = new EventEmitter<void>();
  @Output() previousStep = new EventEmitter<void>();

  renderDependentsForm: boolean = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.scrollToTop();
    this.subscribeToDependentsChange();
  }

  private scrollToTop() {
    window.scrollTo(0, 0);
  }

  private subscribeToDependentsChange() {
    const dependentsControl = this.getControl('dependents');
    dependentsControl.valueChanges.subscribe((value) => {
      if (value === '0') {
        console.log('clear dependents info....');
        this.clearDependentsInfo();
      }
    });
  }

  private clearDependentsInfo() {
    const dependentsInfo = this.getDependents();
    while (dependentsInfo.length !== 0) {
      dependentsInfo.removeAt(0);
    }
  }

  getControl(controlName: string) {
    return this.invoiceNaturalForm?.get(controlName) as FormControl;
  }

  getDependents(): FormArray {
    return this.invoiceNaturalForm.get('dependentsInfo') as FormArray;
  }

  getValue(controlName: string) {
    return this.invoiceNaturalForm?.get(controlName)?.value;
  }

  goToDependentsForm() {
    this.renderDependentsForm = true;
    if (this.getDependents().length === 0) {
      this.addNewDependentFormGroup();
    }
  }

  onSubmit() {
    const haveDependents = this.getValue('dependents') !== '0';
    
    if (!haveDependents) {
      this.formSubmit.emit();
      return;
    }
    
    if (!this.renderDependentsForm) {
      const { isValid, firstInvalidControl } = this.validateStep();
      if (isValid) {
        this.goToDependentsForm();
      } else {
        this.scrollToError(firstInvalidControl);
      }
      return;
    }
    
    if (this.renderDependentsForm) {
      const { isValid, firstInvalidControl } = this.validateDependentForm();
      if (isValid) {
        this.formSubmit.emit();
      } else {
        this.scrollToError(firstInvalidControl);
      }
    }
  }

  addNewDependentFormGroup() {
    const newDependentForm = this.formBuilder.group({
      dependentDocumentTypeId: ['', [Validators.required]],
      dependentDocumentNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      dependentFullName: ['', [Validators.required]],
      dependentKinship: ['', [Validators.required]],
      decreaseInTaxBase: [false, [Validators.required]],
      minorChildren: [false, [Validators.required]],
      minorChildrenFile: [''],
      childrenStudyCertificateFile: [''],
      childrenStudyCertificate: [false, [Validators.required]],
      childrenMedicineCertificate: [false, [Validators.required]],
      childrenMedicineCertificateFile: [''],
      partnerMedicineCertificate: [false, [Validators.required]],
      partnerMedicineCertificateFile: [''],
      familyMedicineCertificate: [false, [Validators.required]],
      familyMedicineCertificateFile: ['']
    });
    this.getDependents().push(newDependentForm);
  }

  validateDependentForm() {
    const dependentsForms = this.getDependentsForms();
    let isValid = true;
    let firstInvalidControl: any = null;
  
    dependentsForms.forEach((dependentForm: FormGroup, formIndex: number) => {
      Object.keys(dependentForm.controls).forEach((controlName) => {
        const control = dependentForm.get(controlName);
        if (control) {
          // Special handling for checkbox controls
          if (this.isCheckboxControl(controlName)) {
            if (!control.value) {
              isValid = false;
              control.setErrors({ 'required': true });
            } else {
              control.setErrors(null);
            }
          }
  
          if (control.invalid) {
            isValid = false;
            control.markAsTouched();
            control.markAsDirty();
            if (!firstInvalidControl) {
              firstInvalidControl = `${controlName}-${formIndex + 1}`;
            }
          }
        }
      });
    });
  
    return { isValid, firstInvalidControl };
  }

  isCheckboxControl(controlName: string): boolean {
    return [
      'decreaseInTaxBase',
      'minorChildren',
      'childrenStudyCertificate',
      'childrenMedicineCertificate',
      'partnerMedicineCertificate',
      'familyMedicineCertificate'
    ].includes(controlName);
  }

  scrollToError(controlName: string | null): void {
      setTimeout(() => {
        if (controlName) {
          const element = document.getElementById(controlName);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }
      });
  }

  getDependentsForms() {
    return this.getDependents().controls as FormGroup[];
  }

  handlePreviousStep() {
    if (this.renderDependentsForm) {
      this.renderDependentsForm = false;
      return;
    }

    this.previousStep.emit();
  }

  trackByIndex(index: number, item: any): number {
    return index;
  }

  deleteDependent(index: number) {
    this.getDependents().removeAt(index);
  }
}
