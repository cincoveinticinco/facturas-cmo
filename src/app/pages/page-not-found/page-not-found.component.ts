import { Component, ChangeDetectionStrategy } from '@angular/core';
import { LogoComponent } from '../../components/atoms/logo/logo.component';

@Component({
    selector: 'app-page-not-found',
    imports: [LogoComponent],
    templateUrl: './page-not-found.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './page-not-found.component.css'
})
export class PageNotFoundComponent {

}
