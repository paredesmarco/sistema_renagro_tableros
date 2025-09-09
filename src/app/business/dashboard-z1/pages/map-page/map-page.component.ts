import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MapViewComponent } from "../../components/map-view/map-view.component";
import { Valor } from '../../interfaces/valor.interface';
import { CardValueComponent } from "../../components/card-porcentaje/card-porcentaje.component";
import { DataService } from '../../services/data-service';

const datos: Valor[] = [
  {
    titulo: "UPAs registradas",
    planificado: 200,
    ejecutado: 120
  },

  {
    titulo: "Personas productoras registradas",
    planificado: 200,
    ejecutado: 120
  },
  {
    titulo: "Provincias registradas",
    planificado: 200,
    ejecutado: 120
  },
  {
    titulo: "Cantones registrados",
    planificado: 200,
    ejecutado: 120
  },
  {
    titulo: "Parroquias registradas",
    planificado: 200,
    ejecutado: 120
  },
  {
    titulo: "Poligonos de levantamiento registrados",
    planificado: 200,
    ejecutado: 140
  },
  {
    titulo: "Superficie de cobertura de territorio registrado (ha)",
    planificado: 200,
    ejecutado: 140
  },
  {
    titulo: "Superficie agroprecuaria registrada",
    planificado: 200,
    ejecutado: 140
  },
  {
    titulo: "Superficie forestal registrada",
    planificado: 200,
    ejecutado: 140
  },
  {
    titulo: "Boletas RENAGRO no UPAs",
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
  // valores = signal(datos);
}
