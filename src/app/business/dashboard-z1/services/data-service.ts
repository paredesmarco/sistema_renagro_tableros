import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DashboardValor } from '../interfaces/dashboard-valor.interface';
import { CardValor } from '../interfaces/card-valor.interface';
import { DashboardIndicador } from '../interfaces/dashboard-indicador.interface';
import { DashboardLugar } from '../interfaces/dashboard-lugar.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private dataUrl = 'http://localhost:3000/api/consulta';
  private dashboardUrlIndicadores = 'http://localhost:3000/api/indicadores';
  private dashboardUrlLugares = 'http://localhost:3000/api/lugares';
  private http = inject(HttpClient);

  provinciaDpa = signal<string>('08');
  cantonDpa = signal<string>('');
  parroquiaDpa = signal<string>('');

  indicadores = signal<DashboardIndicador[]>([]);
  lugares = signal<DashboardLugar[]>([]);
  data = signal<DashboardValor[]>([]);

  filterData = computed<DashboardValor[]>(() => {
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
    this.http.get<DashboardValor[]>(this.dataUrl).subscribe(data => {
      this.data.set(data);
    });
    this.http.get<DashboardIndicador[]>(this.dashboardUrlIndicadores).subscribe(data => {
      this.indicadores.set(data);
      // console.log(this.indicadores());
    });
    this.http.get<DashboardLugar[]>(this.dashboardUrlLugares).subscribe(data => {
      this.lugares.set(data);
      // console.log(this.lugares());
    });
  }

  lugaresProvincias = computed<DashboardLugar[]>(() => {
    const allLugares = this.lugares();
    const allData = this.data();

    // Filtra para obtener solo las provincias (aquellas con DPA de 2 dígitos)
    const lugaresProvincias = allLugares.filter(item => item.parroquiaDpa.trim().length === 2);

    // Contar los registros de datos por provincia
    const countMap = new Map<string, number>();
    allData.forEach(item => {
      const provinciaDpa = item.provinciaDpa;
      const currentCount = countMap.get(provinciaDpa) || 0;
      countMap.set(provinciaDpa, currentCount + 1);
    });

    // Agregar el campo 'estado' a los lugares de provincias
    return lugaresProvincias.map(lugar => {
      const count = countMap.get(lugar.provinciaDpa) || 0;
      let estado: string | null = 'nr';
      if (count > 100) {
        estado = 'ok';
      } else if (count >= 50 && count <= 100) {
        estado = 'war';
      } else if (count >= 1 && count <= 50) {
        estado = 'err';
      }
      return {
        ...lugar,
        parroquiaDpa: lugar.parroquiaDpa.trim(),
        estado: estado
      };
    });
  });

}
