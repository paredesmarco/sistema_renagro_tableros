import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { DataService } from '../../services/data-service';

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
  indOrigen = input.required<string[]>();
  titulo = input.required<string>();

  displayedColumns: string[] = ['indNombre', 'valValor'];

  filteredData = computed(() => {
    return this.dataService.totalIndices().filter(item => this.indOrigen().includes(item.indNombre));
  });
}
