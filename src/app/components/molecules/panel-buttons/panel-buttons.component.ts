import { Component, EventEmitter, Input, Output, input } from '@angular/core';
import { BlackButtonComponent } from '../../atoms/black-button/black-button.component';

@Component({
  selector: 'app-panel-buttons',
  standalone: true,
  imports: [
    BlackButtonComponent,
  ],
  templateUrl: './panel-buttons.component.html',
  styleUrl: './panel-buttons.component.css'
})
export class PanelButtonsComponent {
  @Output() saveForm: EventEmitter<any> = new EventEmitter();

}
