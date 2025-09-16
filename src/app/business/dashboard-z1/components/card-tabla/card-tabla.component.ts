import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { DataService } from '../../services/data-service';
import { CardValor } from '../../interfaces/card-valor.interface';

@Component({
  selector: 'app-card-tabla',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './card-tabla.component.html',
  styleUrl: './card-tabla.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardTablaComponent {
  dataService = inject(DataService);

  ubicacion = input.required<string>();
  titulo = input.required<string>();

  displayedColumns: string[] = ['indNombre', 'valor'];

  filteredData = computed(() => {
    const indicadores = this.dataService.indicadoresPorUbicacion(this.ubicacion())();
    const valores = this.dataService.totalIndices();
    const totales: CardValor[] = indicadores.map(indicador => {
      const valorEncontrado = valores.find(val => val.indId === indicador.indId);
      return {
        indId: indicador.indId,
        indNombre: indicador.indNombre,
        valor: valorEncontrado?.valor || 0
      };
    });
    return totales;
  });
}
