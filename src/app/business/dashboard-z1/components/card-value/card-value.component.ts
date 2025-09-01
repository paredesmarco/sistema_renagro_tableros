import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Valor } from '../../interfaces/valor.interface';

@Component({
  selector: 'app-card-value',
  imports: [],
  templateUrl: './card-value.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardValueComponent {
  dato = input.required<Valor>();
}
