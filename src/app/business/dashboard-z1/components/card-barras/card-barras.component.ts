import { Component, input, OnInit, signal } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartType, Chart, registerables } from 'chart.js';
import { DashboardData } from '../../interfaces/dashboard.interface';

Chart.register(...registerables);

@Component({
  selector: 'app-card-barras',
  imports: [BaseChartDirective],
  templateUrl: './card-barras.component.html',
  styleUrl: './card-barras.component.css',
})

export class CardBarrasComponent implements OnInit {
  datos = input.required<DashboardData[]>();
  indId = input.required<string>();
  tituloX = input<string>('Cultivos');
  tituloY = input<string>('Hectáreas');

  titulo = signal<string>("");
  etiquetas = signal<string[]>([]);
  valores = signal<number[]>([]);

  public barChartData: ChartConfiguration['data'] = {
    labels: this.etiquetas(),
    datasets: [
      {
        data: this.valores(),
        label: this.titulo(),
        backgroundColor: '#5AA454',
      }
    ]
  };

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false, // Permite ajustar el tamaño del canvas
    scales: {
      x: {
        title: {
          display: true,
          text: this.tituloX(),
          font: { size: 12 } // Fuente más pequeña
        },
        ticks: { font: { size: 10 } } // Tamaño de etiquetas más pequeño
      },
      y: {
        title: {
          display: true,
          text: this.tituloY(),
          font: { size: 12 } // Fuente más pequeña
        },
        ticks: { font: { size: 10 } } // Tamaño de etiquetas más pequeño
      }
    }
  };

  public barChartType: ChartType = 'bar';

  constructor() { }

  ngOnInit(): void {
    console.log('ngOnInit');
    let filteredData = this.datos().filter(item => item.indId === this.indId());

    const consolidatedMap = new Map<string, number>();
    filteredData.forEach(item => {
      this.titulo.set(item.indNombre);
      const category = item.valCategoria ?? "-Categoria No Definida-";
      const value = parseFloat(item.valValor) || 0;

      if (consolidatedMap.has(category)) {
        const currentValue = consolidatedMap.get(category) || 0;
        consolidatedMap.set(category, currentValue + value);
      } else {
        consolidatedMap.set(category, value);
      }
    });

    const categories: string[] = [];
    const values: number[] = [];
    consolidatedMap.forEach((value, category) => {
      categories.push(category);
      values.push(value);
    });
    this.etiquetas.set(categories);
    this.valores.set(values);
    console.log('categories');
    console.log(categories);
    console.log(values);
  }
}