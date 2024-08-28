import { Component, Input } from '@angular/core';
import { LogoComponent } from '../../atoms/logo/logo.component';
import { TitleComponent } from '../../atoms/title/title.component';

@Component({
  selector: 'app-form-header',
  standalone: true,
  imports: [
    LogoComponent,
    TitleComponent
  ],
  templateUrl: './form-header.component.html',
  styleUrl: './form-header.component.css'
})
export class FormHeaderComponent {
  @Input() title: string | undefined;
}
