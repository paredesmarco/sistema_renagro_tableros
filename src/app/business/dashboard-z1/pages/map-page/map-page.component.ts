import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MapViewComponent } from "../../components/map-view/map-view.component";
import { Valor } from '../../interfaces/valor.interface';
import { CardValueComponent } from "../../components/card-porcentaje/card-porcentaje.component";
import { DataService } from '../../services/data-service';
import { CardPorcentaje } from '../../interfaces/card-porcentaje.interface';

const datos: CardPorcentaje[] = [
  {
    indId: "UPAs registradas",
    indNombre: "UPAs registradas",
    planificado: 200,
    ejecutado: 120
  },
  {
    indId: "Personas productoras registradas",
    indNombre: "Personas productoras registradas",
    planificado: 200,
    ejecutado: 120
  },
  {
    indId: "Poligonos de levantamiento registrados",
    indNombre: "Poligonos de levantamiento registrados",
    planificado: 200,
    ejecutado: 140
  },
  {
    indId: "Superficie de cobertura de territorio registrado (ha)",
    indNombre: "Superficie de cobertura de territorio registrado (ha)",
    planificado: 200,
    ejecutado: 140
  },
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
  valores = this.dataService.totalesPorcentajes;
  otros = signal(datos);
}
