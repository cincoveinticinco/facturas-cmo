import { Component } from '@angular/core';
import { FormHeaderComponent } from '../../components/molecules/form-header/form-header.component';
import { TIPOPERSONA } from '../../shared/interfaces/typo_persona';
import { PanelButtonsComponent } from '../../components/molecules/panel-buttons/panel-buttons.component';
import { VinculacionNaturalComponent } from '../../components/organisms/vinculacion-natural/vinculacion-natural.component';
import { VinculacionJuridicaComponent } from '../../components/organisms/vinculacion-juridica/vinculacion-juridica.component';
import { PersonasExpuestasPoliticamenteComponent } from '../../components/molecules/personas-expuestas-politicamente/personas-expuestas-politicamente.component';

@Component({
  selector: 'app-forms-cmo',
  standalone: true,
  imports: [
    FormHeaderComponent,
    PanelButtonsComponent,
    VinculacionNaturalComponent,
    VinculacionJuridicaComponent
  ],
  templateUrl: './forms-cmo.component.html',
  styleUrl: './forms-cmo.component.css'
})
export class FormsCmoComponent {
  personEnnum = TIPOPERSONA;
  typePerson: number = TIPOPERSONA.Juridica;
  title: string = '';
  
  ngOnInit() {
    this.getTitle();
  }
  
  getTitle() {
    switch (this.typePerson) {
      case TIPOPERSONA.Natural:
        this.title = 'VINCULACION / ACTUALIZACION DE DATOS PERSONA NATURAL';
        break;
      case TIPOPERSONA.Juridica:
        this.title = 'VINCULACION / ACTUALIZACION DE DATOS PERSONA JURIDICA';
        break;
      default:
        this.title = 'VINCULACION / ACTUALIZACION DE DATOS PERSONA NATURAL';
        break;
    }
  }
}
