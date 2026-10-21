import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-subtitle',
    imports: [],
    templateUrl: './subtitle.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './subtitle.component.css'
})
export class SubtitleComponent {
  @Input() subtitle: string | undefined;
}
