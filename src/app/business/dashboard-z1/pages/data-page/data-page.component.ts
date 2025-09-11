import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { CardValueComponent } from "../../components/card-porcentaje/card-porcentaje.component";
import { CardPromedioComponent } from "../../components/card-promedio/card-promedio.component";
import { Porcentaje } from '../../interfaces/porcentaje.interface';
import { CardBarrasComponent } from "../../components/card-barras/card-barras.component";
import { CardValor } from '../../interfaces/card-valor.interface';
import { DataService } from '../../services/data-service';
import { MatTable, MatTableModule } from "@angular/material/table";
import { DashboardValor } from '../../interfaces/dashboard-valor.interface';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from "@angular/material/card";
import { CardTablaComponent } from "../../components/card-tabla/card-tabla.component";


@Component({
  selector: 'app-data-page',
  imports: [CardPromedioComponent, CardBarrasComponent, MatTableModule, MatCard, CardTablaComponent, CardValueComponent],
  templateUrl: './data-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './data-page.component.css'
})

export default class DataPageComponent {
  private dataService = inject(DataService);

  promedioaBoleta = this.dataService.promedios('promedio_boleta');
  metasOperativas = this.dataService.porcentajesMetaValor('metas_operativo');
  consolidatedData = signal<CardValor[]>([]);
  dashboardValor = signal<DashboardValor[]>([]);
}
