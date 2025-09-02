import { Component, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts'; // ✅ Corrected import
import { ChartConfiguration, ChartType, Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-card-barras',
  imports: [BaseChartDirective],
  templateUrl: './card-barras.component.html',
  styleUrl: './card-barras.component.css',
})

export class CardBarrasComponent implements OnInit {

  public barChartData: ChartConfiguration['data'] = {
    labels: [
      'Cacao',
      'Maíz duro seco',
      'Arroz',
      'Palma africana',
      'Plátano'
    ],
    datasets: [
      {
        data: [125000, 62000, 41000, 29000, 28000],
        label: 'Superficie plantada',
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
          text: 'Cultivos',
          font: { size: 12 } // Fuente más pequeña
        },
        ticks: { font: { size: 10 } } // Tamaño de etiquetas más pequeño
      },
      y: {
        title: {
          display: true,
          text: 'Hectáreas',
          font: { size: 12 } // Fuente más pequeña
        },
        ticks: { font: { size: 10 } } // Tamaño de etiquetas más pequeño
      }
    }
  };

  public barChartType: ChartType = 'bar';

  constructor() { }

  ngOnInit(): void { }
}