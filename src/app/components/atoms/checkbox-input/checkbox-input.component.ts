import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TextInputComponent } from '../text-input/text-input.component';

@Component({
  selector: 'app-checkbox-input',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, TextInputComponent],
  templateUrl: './checkbox-input.component.html',
  styleUrls: ['./checkbox-input.component.css']
})
export class CheckboxInputComponent {

  @Input() label: string | undefined;
  @Input() control: FormControl = new FormControl();
  @Input() controlName: string = '';
  @Input() description: string = '';
  @Input() form: FormGroup | undefined;
  @Input() customCheckboxLabel: {
    true: string,
    false: string
  } = {
    true: 'Si',
    false: 'No'
  };
  @Input() boldLabel: boolean = true;
  @Input() controlersWhenTrue: string[] = [];
  @Input() customName: string | undefined;

  ngOnInit() {
    this.handleChange(this.control.value);
  }

  getErrors(): string | null {
    const touched = this.control.touched;
    if (this.control.hasError('required') && touched) {
      return 'Este campo es requerido *';
    }
    return null;
  }

  handleChange(value: string) {
    this.setDescriptionControl(value, this.controlName);
    this.setFileControl(value, this.controlName);
  }

  setDescriptionControl(value: string, nameControl: string) {
    if (this.form) {
      const descriptionControl = this.form.get(`${nameControl}_description`);
      const isChecked = value === '1';

      if (isChecked) {
        descriptionControl?.setValidators(Validators.required);
      } else {
        descriptionControl?.clearValidators();
      }
      descriptionControl?.updateValueAndValidity();

      if (this.controlersWhenTrue.length > 0) {
        this.controlersWhenTrue.forEach(controlName => {
          const dependentControl = this.form?.get(controlName);
          if (isChecked) {
            dependentControl?.setValidators(Validators.required);
          } else {
            dependentControl?.clearValidators();
          }
          dependentControl?.updateValueAndValidity();
        });
      }
    }
  }

  setFileControl(value: string, nameControl: string) {
    if (this.form) {
      const fileControl = this.form.get(`${nameControl}File`);
      const isChecked = value === '1';

      if (isChecked) {
        fileControl?.setValidators(Validators.required);
      } else {
        fileControl?.clearValidators();
      }
      fileControl?.updateValueAndValidity();
    }
  }
}