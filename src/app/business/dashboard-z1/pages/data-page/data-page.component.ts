import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { CardValueComponent } from "../../components/card-porcentaje/card-porcentaje.component";
import { CardPromedioComponent } from "../../components/card-promedio/card-promedio.component";
import { Porcentaje } from '../../interfaces/porcentaje.interface';
import { CardBarrasComponent } from "../../components/card-barras/card-barras.component";
import { CardValor } from '../../interfaces/card-valor.interface';
import { DataService } from '../../services/data-service';
import { MatTable, MatTableModule } from "@angular/material/table";

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
  imports: [CardPromedioComponent, CardBarrasComponent, MatTableModule],
  templateUrl: './data-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './data-page.component.css'
})

export default class DataPageComponent implements OnInit {
  valores = signal(datos);
  consolidatedData = signal<CardValor[]>([]);
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getConsolidatedData('16').subscribe(data => {
      this.consolidatedData.set(data);
      console.log('Datos consolidados:', this.consolidatedData());
    });
  }
}
