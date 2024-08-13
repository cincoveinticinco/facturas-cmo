import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TextInputComponent } from '../../atoms/text-input/text-input.component';
import { SubtitleComponent } from '../../atoms/subtitle/subtitle.component';
import { CheckboxInputComponent } from '../../atoms/checkbox-input/checkbox-input.component';
import { ElectronicSignatureAuthComponent } from '../electronic-signature-auth/electronic-signature-auth.component';
import { SelectInputComponent } from '../../atoms/select-input/select-input.component';
import { MatIconModule } from '@angular/material/icon';

export interface SelectOption {
  optionName: string;
  optionValue: string;
}

@Component({
  selector: 'app-inf-step-one',
  templateUrl: './inf-step-one.component.html',
  standalone: true,
  imports: [
    TextInputComponent, 
    ReactiveFormsModule, 
    SubtitleComponent, 
    CheckboxInputComponent, 
    ElectronicSignatureAuthComponent, 
    SelectInputComponent,
    MatIconModule
    
  ],
  styleUrls: ['./inf-step-one.component.css']
})

export class InfStepOneComponent {
  @Input() invoiceNaturalForm!: FormGroup;
  @Input() vendorInfo: any;
  @Input() selectOptionsPo?: SelectOption[];
  @Input() poProjections: any[] = [];
  @Output() formSubmit = new EventEmitter<void>();
  availableOptions: any = [];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.availableOptions[`${this.getOrderIds().length - 1}`] = this.selectOptionsPo;
    this.getProjectionsForSelectedOrders();
  }

  getControl(controlName: string) {
    return this.invoiceNaturalForm?.get(controlName) as FormControl;
  }

  getValue(controlName: string) {
    return this.invoiceNaturalForm?.get(controlName)?.value;
  }

  getPurchaseOrdersArray(): FormArray {
    return this.invoiceNaturalForm.get('orderIds') as FormArray;
  }

  getPurchaseOrdersControls() {
    return this.getPurchaseOrdersArray().controls as FormControl[];
  }

  getPurchaseOrderValue(index: number) {
    return this.getPurchaseOrdersArray().at(index).value;
  }

  getOrderIds(): FormArray {
    return this.invoiceNaturalForm.get('orderIds') as FormArray;
  }

  deletePurchaseOrderControl(index: number): void {
    if(index > 0) {
      this.getOrderIds().removeAt(index);
    }
  }

  addPurchaseOrderControl(): void {
    this.getOrderIds().push(this.formBuilder.control(0));
    this.updateSelectOptionsPo(this.selectOptionsPo);
  }

  updateSelectOptionsPo(selectOptionsPo: SelectOption[] | undefined) {
    if (selectOptionsPo) {

      const filteredOptions: SelectOption[] = selectOptionsPo.filter(option => {
        return !this.getOrderIds().value.includes(option.optionValue.toString());
      });

      this.availableOptions = {
        ...this.availableOptions,
        [`${this.getOrderIds().length - 1}`]: filteredOptions
      }

      console.log(this.availableOptions);
    }
  }

  getProjectionsForSelectedOrders() {
    const ids = this.invoiceNaturalForm.get('orderIds')?.value;
    const projections = this.poProjections.filter((projection: any) => ids.includes(projection.f_purchase_order_id.toString()
    ));
    console.log(this.poProjections, ids)
    return projections
  }

  fromNumberToCop(number: number) {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(number);
  }

  onSubmit() {
    this.formSubmit.emit();
  }
}