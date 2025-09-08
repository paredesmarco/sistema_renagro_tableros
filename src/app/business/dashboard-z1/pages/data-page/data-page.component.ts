import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { CardValueComponent } from "../../components/card-porcentaje/card-porcentaje.component";
import { CardPromedioComponent } from "../../components/card-promedio/card-promedio.component";
import { Porcentaje } from '../../interfaces/porcentaje.interface';
import { CardBarrasComponent } from "../../components/card-barras/card-barras.component";
import { CardValor } from '../../interfaces/card-valor.interface';
import { DataService } from '../../services/data-service';
import { MatTable, MatTableModule } from "@angular/material/table";
import { DashboardData } from '../../interfaces/dashboard-valor.interface';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from "@angular/material/card";
import { CardTablaComponent } from "../../components/card-tabla/card-tabla.component";

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
  imports: [CardPromedioComponent, CardBarrasComponent, MatTableModule, MatCard, MatCardHeader, MatCardTitle, MatCardContent, CardTablaComponent],
  templateUrl: './data-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './data-page.component.css'
})

export default class DataPageComponent implements OnInit {
  valores = signal(datos);
  consolidatedData = signal<CardValor[]>([]);
  dashboardValor = signal<DashboardData[]>([]);

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    // this.dataService.getData().subscribe(data => {
    //   this.dashboardValor.set(data);
    // });
    this.dashboardValor.set(this.dataService.data());

    // this.dataService.data().subscribe(data => {
    //   this.consolidatedData.set(data);
    // });
  }
}
