import { Component, Input } from '@angular/core';
import { SubtitleComponent } from '../../atoms/subtitle/subtitle.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-declaracion-pep',
  standalone: true,
  imports: [
    DatePipe,

    SubtitleComponent,
  ],
  templateUrl: './declaracion-pep.component.html',
  styleUrl: './declaracion-pep.component.css'
})
export class DeclaracionPepComponent {

  @Input() lists: any = {};

}
