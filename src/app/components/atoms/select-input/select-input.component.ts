
import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-select-input',
    imports: [ReactiveFormsModule],
    templateUrl: './select-input.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './select-input.component.css'
})

export class SelectInputComponent {
  @Input() options: any[] = [];
  @Input() description: string = '';
  @Input() label: string = '';
  @Input() optionValue: string = '';
  @Input() optionName: string = '';

  @Input() control: FormControl = new FormControl();

  @Output() change: EventEmitter<any> = new EventEmitter();

  getErrors(): string | null {
    const touched = this.control.touched;
    if (this.control.hasError('required') && touched) {
      return 'Este campo es requerido *';
    }
    return null;
  }

  onChange(event: any): void {
    if(this.change) {
      this.change.emit(event);
    }
  }
}
