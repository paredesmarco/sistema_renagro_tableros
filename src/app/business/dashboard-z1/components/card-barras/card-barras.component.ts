import { Component, input, OnInit, signal, computed } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartType, Chart, registerables } from 'chart.js';
import { DashboardData } from '../../interfaces/dashboard.interface';

Chart.register(...registerables);

@Component({
  selector: 'app-card-barras',
  standalone: true, // Agrega esta línea si no lo está
  imports: [BaseChartDirective],
  templateUrl: './card-barras.component.html',
  styleUrl: './card-barras.component.css',
})
export class CardBarrasComponent implements OnInit {
  datos = input.required<DashboardData[]>();
  indId = input.required<string>();
  tituloX = input<string>('Cultivos');
  tituloY = input<string>('Hectáreas');

  titulo = signal<string>('');
  etiquetas = signal<string[]>([]);
  valores = signal<number[]>([]);

  public barChartData = computed<ChartConfiguration['data']>(() => {
    return {
      labels: this.etiquetas(),
      datasets: [
        {
          data: this.valores(),
          label: this.titulo(),
          backgroundColor: '#5AA454',
        },
      ],
    };
  });

  public barChartOptions = computed<ChartConfiguration['options']>(() => {
    return {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          title: {
            display: true,
            text: this.tituloX(),
            font: { size: 12 },
          },
          ticks: { font: { size: 10 } },
        },
        y: {
          title: {
            display: true,
            text: this.tituloY(),
            font: { size: 12 },
          },
          ticks: { font: { size: 10 } },
        },
      },
    };
  });

  public barChartType: ChartType = 'bar';

  constructor() {
    // this.datos.subscribe(() => this.processData());
  }

  ngOnInit(): void {
    this.processData();
  }

  private processData(): void {
    console.log('Procesando datos');
    const filteredData = this.datos().filter((item) => item.indId === this.indId());

    const consolidatedMap = new Map<string, number>();
    let chartTitle = '';
    filteredData.forEach((item) => {
      if (!chartTitle) {
        chartTitle = item.indNombre;
      }
      const category = item.valCategoria ?? '-Categoria No Definida-';
      const value = parseFloat(item.valValor) || 0;

      const currentValue = consolidatedMap.get(category) || 0;
      consolidatedMap.set(category, currentValue + value);
    });

    const categories: string[] = [];
    const values: number[] = [];
    consolidatedMap.forEach((value, category) => {
      categories.push(category);
      values.push(value);
    });

    // Actualiza las señales
    this.titulo.set(chartTitle);
    this.etiquetas.set(categories);
    this.valores.set(values);

    console.log('categories:', this.etiquetas());
    console.log('values:', this.valores());
  }
}