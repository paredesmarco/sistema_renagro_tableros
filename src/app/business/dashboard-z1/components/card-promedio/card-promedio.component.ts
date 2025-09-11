import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { MatCard, MatCardTitle, MatCardHeader, MatCardContent } from "@angular/material/card";
import { MatDivider } from "@angular/material/divider";
import { CardPromedio } from '../../interfaces/card-promedio.interface';

@Component({
  selector: 'app-card-promedio',
  imports: [MatCard, MatCardHeader, MatDivider, MatCardContent, MatCardTitle],
  templateUrl: './card-promedio.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './card-promedio.component.css'
})

export class CardPromedioComponent {
  dato = input.required<CardPromedio>();

  promedioFormateado = computed(() => {
    return this.dato().promedio.toFixed(1);
  });

  minimoFormateado = computed(() => {
    return this.dato().minimo.toFixed(1);
  });

  maximoFormateado = computed(() => {
    return this.dato().maximo.toFixed(1);
  });
}
