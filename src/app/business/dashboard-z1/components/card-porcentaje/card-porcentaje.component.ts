import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { MatCard, MatCardTitle, MatCardHeader, MatCardContent } from "@angular/material/card";
import { MatDivider } from "@angular/material/divider";
import { CardPorcentaje } from '../../interfaces/card-porcentaje.interface';

@Component({
  selector: 'app-card-porcentaje',
  imports: [MatCard, MatCardTitle, MatCardHeader, MatDivider, MatCardContent],
  templateUrl: './card-porcentaje.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './card-porcentaje.component.css'
})
export class CardValueComponent {
  dato = input.required<CardPorcentaje>();

  porcentajeFormateado = computed(() => {
    return parseFloat(this.dato().porcentaje).toFixed(0);
  });
}
