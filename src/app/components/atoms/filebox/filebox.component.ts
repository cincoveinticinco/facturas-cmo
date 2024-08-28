// File: filebox.component.ts
import { Component, Input, Optional, Self, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, NgControl, ReactiveFormsModule, ValidationErrors, Validator } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DragAndDropFileDirective } from '../../../shared/directives/drag-and-drop-file.directive';
import { DialogComponent } from '../../../shared/components/dialog/dialog.component';

@Component({
  selector: 'app-filebox',
  standalone: true,
  imports: [DragAndDropFileDirective, DialogComponent, ReactiveFormsModule],
  templateUrl: './filebox.component.html',
  styleUrls: ['./filebox.component.css']
})
export class FileboxComponent implements ControlValueAccessor, Validator, OnInit, OnDestroy {

  @Input() onlyPdf = false;
  @Input() control: FormControl = new FormControl();
  @Input() allowedExtensions: string[] = ['pdf', 'PDF', 'jpeg', 'jpg', 'png'];

  @Output() onChanges = new EventEmitter<any>()

  private controlValueSubscription: Subscription | undefined;
  onChange = (value: any) => {};
  onTouched = () => {};
  value: any;
  disabled = false;
  fileName: any;
  view = '';
  acceptAllowedExtensions: string = '';

  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  setAllowedExtensions() {
    if (this.onlyPdf) this.allowedExtensions = ['pdf', 'PDF'];
    this.acceptAllowedExtensions = this.allowedExtensions.map(ext => `.${ext}`).join(', ');
  }

  ngOnInit() {
    if (this.control) {
      if(this.control.value) {
        this.value = this.control.value;
        this.view = 'filled';
      }
    }

    this.setAllowedExtensions();
  }

  ngOnDestroy() {
    if (this.controlValueSubscription) {
      this.controlValueSubscription.unsubscribe();
    }
  }

  getErrors(): string | null {
    if (this.control.hasError('required') && (this.control.dirty || this.control.touched)) {
      return 'Este campo es requerido *';
    }
    return null;
  }

  onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files;
    if (files && files.length > 0) {
      const file = files[0];
      this.value = { file, name: file.name, url: null };
      this.onChange(this.value);
      this.control.setValue(this.value);
    }
  }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return null;
  }

  onDragFileChange(files: any) {
    if (files && files.length > 0) {
      const file = files[0];
      this.value = { file, name: file.name, url: null };
      this.onChange(this.value);
      this.control.setValue(this.value);
    }
  }

  clearFile() {
    this.control.setValue(null);
    this.value = null;
    this.onChange(this.value);
  }

  writeValue(value: any): void {
    this.value = value;
    if (value) {
      this.view = 'filled';
    } else {
      this.view = '';
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  changeView(newView: string = '') {
    this.view = newView;
  }
}
