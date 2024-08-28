import { Component, Input } from '@angular/core';
import { SubtitleComponent } from '../../atoms/subtitle/subtitle.component';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-autorizacion-datos-personales',
  standalone: true,
  imports: [
    SubtitleComponent
  ],
  templateUrl: './autorizacion-datos-personales.component.html',
  styleUrl: './autorizacion-datos-personales.component.css'
})
export class AutorizacionDatosPersonalesComponent {
}
