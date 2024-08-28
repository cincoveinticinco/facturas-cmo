import { Component, Input, OnInit } from '@angular/core';
import { SubtitleComponent } from '../../atoms/subtitle/subtitle.component';
import { TextInputComponent } from '../../atoms/text-input/text-input.component';
import { CheckboxInputComponent } from '../../atoms/checkbox-input/checkbox-input.component';
import { FormControl, FormGroup } from '@angular/forms';
import { SelectInputComponent } from '../../atoms/select-input/select-input.component';
import { PercentPipe } from '@angular/common';

@Component({
  selector: 'app-datos-salud',
  standalone: true,
  imports: [
    PercentPipe,

    SubtitleComponent,
    TextInputComponent,
    CheckboxInputComponent,
    SelectInputComponent,
  ],
  templateUrl: './datos-salud.component.html',
  styleUrl: './datos-salud.component.css'
})
export class DatosSaludComponent implements OnInit {

  @Input() form: FormGroup | undefined;
  @Input() lists: any = {};

  percentageRiskLevel: number = 0;

  ngOnInit(): void {
    this.getRiskPercentage();
  }

  getControl(controlName: string): FormControl {
    return this.form?.get(controlName) as FormControl;
  }

  showDescription(controlName: string): '0' | '1' {
    return this.getControl(controlName).value
  }

  getRiskPercentage() {
    this.percentageRiskLevel = this.lists?.riskLevels?.find((item: any) => item.id == this.getControl('risk_level')?.value)?.risk_percentage;
  }
}
