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
    //... your data
    labels: ['Cacao', 'Maíz duro seco', 'Arroz', 'Palma africana', 'Plátano'],
    datasets: [
      {
        data: [125000, 62000, 41000, 29000, 28000],
        label: 'Superficie plantada en hectáreas',
        backgroundColor: '#5AA454',
        hoverBackgroundColor: '#6BB46A',
      }
    ]
  };

  public barChartOptions: ChartConfiguration['options'] = {
    //... your options
    responsive: true,
    scales: {
      x: { title: { display: true, text: 'Cultivos' } },
      y: { title: { display: true, text: 'Hectáreas' }, beginAtZero: true }
    }
  };

  public barChartType: ChartType = 'bar';

  constructor() { }

  ngOnInit(): void { }
}