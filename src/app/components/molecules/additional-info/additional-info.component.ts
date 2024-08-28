import { Component, Input } from '@angular/core';
import { SubtitleComponent } from '../../atoms/subtitle/subtitle.component';

@Component({
  selector: 'app-additional-info',
  standalone: true,
  imports: [
    SubtitleComponent
  ],
  templateUrl: './additional-info.component.html',
  styleUrl: './additional-info.component.css'
})
export class AdditionalInfoComponent {

  @Input() lists: any = {};

}
