import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CardValueComponent } from "../../components/card-porcentaje/card-porcentaje.component";
import { CardPromedioComponent } from "../../components/card-promedio/card-promedio.component";
import { Porcentaje } from '../../interfaces/porcentaje.interface';

const datos: Porcentaje[] = [
  {
    titulo: "Boletas diarias por encuestador",
    minimo: 6,
    maximo: 10,
    promedio: 8
  },
  {
    titulo: "Tiempo de la boleta por encuestador",
    minimo: 30,
    maximo: 60,
    promedio: 50
  }
]

@Component({
  selector: 'app-data-page',
  imports: [CardValueComponent, CardPromedioComponent],
  templateUrl: './data-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataPageComponent {
  valores = signal(datos);
}
