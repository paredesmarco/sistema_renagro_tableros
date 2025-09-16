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
    const ejecutado = this.dato().ejecutado;
    const planificado = this.dato().planificado;
    if (planificado === 0) {
      return '0';
    }
    let porcentaje = (ejecutado / planificado) * 100;
    porcentaje = porcentaje > 100 ? 100 : porcentaje;
    return (porcentaje).toFixed(0);
  });

  ejecutadoFormateado = computed(() => {
    return this.dato().ejecutado.toFixed(1);
  });

  planificadoFormateado = computed(() => {
    return this.dato().planificado.toFixed(1);
  });
}
