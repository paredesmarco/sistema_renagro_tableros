import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MapViewComponent } from "../../components/map-view/map-view.component";
import { CardValueComponent } from "../../components/card-porcentaje/card-porcentaje.component";
import { DataService } from '../../services/data-service';
import { CardPorcentaje } from '../../interfaces/card-porcentaje.interface';

const datos: CardPorcentaje[] = [
  {
    indId: "Superficie agroprecuaria registrada",
    indNombre: "Superficie agroprecuaria registrada",
    planificado: 200,
    ejecutado: 140
  },
  {
    indId: "Superficie forestal registrada",
    indNombre: "Superficie forestal registrada",
    planificado: 200,
    ejecutado: 140
  },
  {
    indId: "Boletas RENAGRO no UPAs",
    indNombre: "Boletas RENAGRO no UPAs",
    planificado: 200,
    ejecutado: 140
  }
]

@Component({
  selector: 'app-map-page',
  imports: [MapViewComponent, CardValueComponent],
  templateUrl: './map-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './map-page.component.css'
})
export class MapPageComponent {
  private dataService = inject(DataService);
  totales = this.dataService.porcentajesTotales;
  metasValor = this.dataService.porcentajesMetaValor('metas_mapa');
}
