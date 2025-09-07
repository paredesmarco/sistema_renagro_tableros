import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DashboardData } from '../interfaces/dashboard.interface';
import { CardValor } from '../interfaces/card-valor.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private dataUrl = 'http://localhost:3000/api/consulta';
  private http = inject(HttpClient);

  data = signal<DashboardData[]>([]);
  provinciaDpa = signal<string>('16');
  cantonDpa = signal<string>('');
  parroquiaDpa = signal<string>('');

  // totaliza los valores por cada indId
  totalIndices = computed<CardValor[]>(() => {
    const allData = this.data();
    const provincia = this.provinciaDpa();
    const canton = this.cantonDpa();
    const parroquia = this.parroquiaDpa();

    // Filtra los datos por provincia, cantón y parroquia
    const filteredData = allData.filter(item => {
      let matches = false;
      if (provincia && item.provinciaDpa === provincia) {
        matches = true;
      }
      if (canton && item.cantonDpa === canton) {
        matches = true;
      }
      if (parroquia && item.parroquiaDpa === parroquia) {
        matches = true;
      }
      return matches;
    });

    // Totaliza los valores por cada indId y almacena el nombre
    const totalsMap = new Map<string, number>();
    const namesMap = new Map<string, string>();

    filteredData.forEach(item => {
      const indId = item.indId;
      const value = parseFloat(item.valValor) || 0;
      const currentValue = totalsMap.get(indId) || 0;
      totalsMap.set(indId, currentValue + value);

      // Almacena el nombre del indicador
      if (!namesMap.has(indId)) {
        namesMap.set(indId, item.indNombre);
      }
    });

    // Convierte los Maps en un array de objetos con el formato de la interfaz
    const totalsArray = Array.from(totalsMap, ([indId, valor]) => ({
      indId: indId,
      indNombre: namesMap.get(indId) || '',
      valor: valor
    }));

    return totalsArray;
  });

  constructor() {
    this.http.get<DashboardData[]>(this.dataUrl).subscribe(data => {
      this.data.set(data);
    });
  }
}
