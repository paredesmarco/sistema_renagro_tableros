import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { DashboardData } from '../interfaces/dashboard.interface';
import { CardValor } from '../interfaces/card-valor.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private dataUrl = 'http://localhost:3000/api/consulta';
  private http = inject(HttpClient);

  constructor() { }

  /**
   * Carga y procesa los datos de la URL de la API.
   */
  getData(): Observable<DashboardData[]> {
    return this.http.get<DashboardData[]>(this.dataUrl);
  }

  /**
   * Filtra y consolida los datos basándose en los criterios de consulta DPA.
   * @param provinciaDpa Código DPA de la provincia (opcional).
   * @param cantonDpa Código DPA del cantón (opcional).
   * @param parroquiaDpa Código DPA de la parroquia (opcional).
   */
  getConsolidatedData(
    provinciaDpa?: string,
    cantonDpa?: string,
    parroquiaDpa?: string
  ): Observable<CardValor[]> {
    return this.getData().pipe(
      map(data => {
        // Paso 1: Filtrar los datos si se proporcionan criterios DPA
        let filteredData = data;
        if (provinciaDpa) {
          filteredData = filteredData.filter(item => item.provinciaDpa === provinciaDpa);
        }
        if (cantonDpa) {
          filteredData = filteredData.filter(item => item.cantonDpa === cantonDpa);
        }
        if (parroquiaDpa) {
          filteredData = filteredData.filter(item => item.parroquiaDpa === parroquiaDpa);
        }

        // Paso 2: Consolidar los datos por indicador
        const indiceValor = new Map<string, number>();
        const indiceNombre = new Map<string, string>();

        filteredData.forEach(item => {
          const indId = item.indId;
          // Asegúrate de que valValor sea un número
          const value = parseFloat(item.valValor) || 0;

          if (indiceValor.has(indId)) {
            const currentValue = indiceValor.get(indId) || 0;
            indiceValor.set(indId, currentValue + value);
          } else {
            indiceValor.set(indId, value);
            indiceNombre.set(indId, item.indNombre);
          }
        });

        // Paso 3: Convertir el mapa a un array de objetos
        const consolidatedArray: CardValor[] = [];
        indiceValor.forEach((value, indId) => {
          const indNombre = indiceNombre.get(indId) || '';
          const roundedValue = parseFloat(value.toFixed(2));
          consolidatedArray.push(
            {
              indId: indId,
              indNombre: indNombre,
              valor: roundedValue
            }
          );
        });

        return consolidatedArray;
      })
    );
  }
}
