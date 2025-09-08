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

  filterData = computed<DashboardData[]>(() => {
    const allData = this.data();
    const provincia = this.provinciaDpa();
    const canton = this.cantonDpa();
    const parroquia = this.parroquiaDpa();

    return allData.filter(item => {
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
  });

  totalIndices = computed<CardValor[]>(() => {
    const dataToProcess = this.filterData();
    const totalsMap = new Map<string, number>();
    const namesMap = new Map<string, string>();

    dataToProcess.forEach(item => {
      const indId = item.indId;
      const value = parseFloat(item.valValor) || 0;
      const currentValue = totalsMap.get(indId) || 0;
      totalsMap.set(indId, currentValue + value);

      if (!namesMap.has(indId)) {
        namesMap.set(indId, item.indNombre);
      }
    });

    const totalsArray = Array.from(totalsMap, ([indId, valor]) => ({
      indId: indId,
      indNombre: namesMap.get(indId) || '',
      valor: valor
    }));

    return totalsArray;
  });

  // El tipo de retorno está explícitamente definido aquí
  getConsolidatedDataByIndId(indId: string): { labels: string[], values: number[], title: string } {
    const filteredByDpa = this.filterData();
    const filteredData = filteredByDpa.filter(item => item.indId === indId);

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

    return {
      labels: categories,
      values: values,
      title: chartTitle
    };
  }

  constructor() {
    this.http.get<DashboardData[]>(this.dataUrl).subscribe(data => {
      this.data.set(data);
    });
  }
}
