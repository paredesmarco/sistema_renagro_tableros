import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { DashboardData } from '../../interfaces/dashboard.interface';
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
  indTipo = input.required<string>();

  displayedColumns: string[] = ['indNombre', 'valValor'];

  filteredData = computed(() => {
    return this.dataService.data().filter(item => item.indTipo === this.indTipo());
  });
}
