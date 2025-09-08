import { Component, input, signal, computed, inject, effect } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartType, Chart, registerables } from 'chart.js';
import { DataService } from '../../services/data-service';

Chart.register(...registerables);

@Component({
  selector: 'app-card-barras',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './card-barras.component.html',
  styleUrl: './card-barras.component.css',
})

export class CardBarrasComponent {
  indId = input.required<string>();
  color = input<string>('#8268a7');
  tituloX = input<string>('Cultivos');
  tituloY = input<string>('Hectáreas');

  private dataService = inject(DataService);

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
          backgroundColor: this.color(),
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

  // Usamos effect() para reaccionar a los cambios en el servicio
  constructor() {
    effect(() => {
      // Al llamar a la señal aquí, el 'effect' se activará
      // cada vez que la señal 'filterData' cambie de valor.
      this.dataService.filterData();

      // Llamamos al método que procesa los datos para actualizar el componente
      this.processData();
    });
  }

  private processData(): void {
    const consolidatedData = this.dataService.getConsolidatedDataByIndId(this.indId());
    this.titulo.set(consolidatedData.title);
    this.etiquetas.set(consolidatedData.labels);
    this.valores.set(consolidatedData.values);
  }
}