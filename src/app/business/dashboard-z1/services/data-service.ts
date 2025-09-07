import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DashboardData } from '../interfaces/dashboard.interface';

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
  totalIndices = computed(() => {
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
      if (matches && canton && item.cantonDpa === canton) {
        matches = true;
      }
      if (matches && parroquia && item.provinciaDpa === parroquia) {
        matches = true;
      }
      return matches;
    });

    // Totaliza los valores por cada indId en un Map
    const totalsMap = new Map<string, number>();
    filteredData.forEach(item => {
      const indId = item.indId;
      const value = parseFloat(item.valValor) || 0;
      const currentValue = totalsMap.get(indId) || 0;
      totalsMap.set(indId, currentValue + value);
    });

    // Convierte el Map en un array de objetos
    const totalsArray = Array.from(totalsMap, ([indId, total]) => ({ indNombre: indId, valValor: total }));
    // console.log('totalsArray');
    // console.log(totalsArray);
    return totalsArray;
  });

  constructor() {
    this.http.get<DashboardData[]>(this.dataUrl).subscribe(data => {
      this.data.set(data);
      // console.log('DataService.constructor.data');
      // console.log(this.data());
    });
  }
}
