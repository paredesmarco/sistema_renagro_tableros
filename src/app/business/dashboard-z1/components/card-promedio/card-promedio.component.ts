import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Porcentaje } from '../../interfaces/porcentaje.interface';

@Component({
  selector: 'app-card-promedio',
  imports: [],
  templateUrl: './card-promedio.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardPromedioComponent {
  dato = input.required<Porcentaje>();
}
