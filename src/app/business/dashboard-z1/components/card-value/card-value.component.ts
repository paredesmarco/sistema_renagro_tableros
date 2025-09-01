import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Valor } from '../../interfaces/valor.interface';
import { MatCard, MatCardTitle } from "@angular/material/card";

@Component({
  selector: 'app-card-value',
  imports: [MatCard, MatCardTitle],
  templateUrl: './card-value.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './card-value.component.css'
})
export class CardValueComponent {
  dato = input.required<Valor>();
}
