import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DashboardValor } from '../interfaces/dashboard-valor.interface';
import { CardValor } from '../interfaces/card-valor.interface';
import { DashboardIndicador } from '../interfaces/dashboard-indicador.interface';
import { DashboardLugar } from '../interfaces/dashboard-lugar.interface';
import { CardPorcentaje } from '../interfaces/card-porcentaje.interface';
import { DashboardMeta } from '../interfaces/dashboard-meta.interface';
import { CardPromedio } from '../interfaces/card-promedio.interface';
import { DashboardAvance } from '../interfaces/dashboard-avance.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private dataUrl = 'http://localhost:3000/api/consulta';
  private dashboardUrlIndicadores = 'http://localhost:3000/api/indicadores';
  private dashboardUrlLugares = 'http://localhost:3000/api/lugares';
  private dashboardUrlMetas = 'http://localhost:3000/api/metas';
  private dashboardUrlAvances = 'http://localhost:3000/api/avance';
  private http = inject(HttpClient);

  padreDpa = signal<string>('');
  seleccionadoDpa = signal<string>('');

  indicadores = signal<DashboardIndicador[]>([]);
  lugares = signal<DashboardLugar[]>([]);
  metas = signal<DashboardMeta[]>([]);
  avances = signal<DashboardAvance[]>([]);
  data = signal<DashboardValor[]>([]);

  constructor() {
    this.http.get<DashboardValor[]>(this.dataUrl).subscribe(data => {
      this.data.set(data);
    });
    this.http.get<DashboardIndicador[]>(this.dashboardUrlIndicadores).subscribe(data => {
      this.indicadores.set(data);
    });
    this.http.get<DashboardLugar[]>(this.dashboardUrlLugares).subscribe(data => {
      this.lugares.set(data);
    });
    this.http.get<DashboardMeta[]>(this.dashboardUrlMetas).subscribe(data => {
      this.metas.set(data);
    });
    this.http.get<DashboardAvance[]>(this.dashboardUrlAvances).subscribe(data => {
      this.avances.set(data);
    });
  }


  private indicadoresMap = computed(() => {
    const indicadorMap = new Map<string, DashboardIndicador>();
    this.indicadores().forEach(ind => indicadorMap.set(ind.indId, ind));
    return indicadorMap;
  });

  filterLugares = computed<DashboardLugar[]>(() => {
    const allLugares = this.lugares();
    const padreDpa = this.padreDpa();

    console.log(`filterLugares: ${padreDpa} ${padreDpa.length}`)
    return allLugares.filter(item => {
      let matches = false;
      if (padreDpa.length == 2 && item.parroquiaDpa.trim().length === 4 && item.provinciaDpa === padreDpa) {
        matches = true;
      }
      if (padreDpa.length == 4 && item.parroquiaDpa.trim().length === 6 && item.cantonDpa === padreDpa) {
        matches = true;
      }
      if (padreDpa.length < 1 && item.parroquiaDpa.trim().length === 2) {
        matches = true;
      }
      return matches;
    });
  });

  filterMetas = computed<DashboardMeta[]>(() => {
    const allMetas = this.metas();
    const lugaresSel = this.filterLugares();

    const parroquiasSeleccionadas = new Set<string>(
      lugaresSel.map(lugar => lugar.parroquiaId)
    );

    return allMetas.filter(meta =>
      parroquiasSeleccionadas.has(meta.metParroquia)
    );
  });

  filterAvances = computed<DashboardAvance[]>(() => {
    const allAvances = this.avances();
    const lugaresSel = this.filterLugares();

    const parroquiasSeleccionadas = new Set<string>(
      lugaresSel.map(lugar => lugar.parroquiaId)
    );

    return allAvances.filter(meta =>
      parroquiasSeleccionadas.has(meta.avaParroquia)
    );
  });

  filterData = computed<DashboardValor[]>(() => {
    const allData = this.data();
    const seleccionado = this.seleccionadoDpa().trim();
    console.log(`filterData: ${seleccionado} ${seleccionado.length}`)

    return allData.filter(item => {
      let matches = false;
      if (seleccionado.length < 2) {
        matches = true;
      }
      if (seleccionado.length == 2 && item.provinciaDpa === seleccionado) {
        matches = true;
      }
      if (seleccionado.length == 4 && item.cantonDpa === seleccionado) {
        matches = true;
      }
      if (seleccionado.length == 6 && item.parroquiaDpa === seleccionado) {
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

  // data para graficos de barras
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

  lugaresPresenta = computed<DashboardLugar[]>(() => {
    const allLugares = this.lugares();
    const allData = this.data();
    const padreDpa = this.padreDpa().trim();


    // Filtra para obtener los lugares a presentar en el mapa
    let lugaresMuestra = <DashboardLugar[]>([]);
    switch (padreDpa.length) {
      case 2:
        lugaresMuestra = allLugares.filter(item => item.parroquiaDpa.trim().length === 4 && item.provinciaDpa === padreDpa);
        break;
      case 4:
        lugaresMuestra = allLugares.filter(item => item.parroquiaDpa.trim().length === 6 && item.cantonDpa === padreDpa);
        break;
      default:
        lugaresMuestra = allLugares.filter(item => item.parroquiaDpa.trim().length === 2);
        break;
    }
    console.log('lugaresPresenta');
    console.log(allLugares.length);
    console.log(lugaresMuestra);

    // Contar los registros de datos por provincia
    const countMap = new Map<string, number>();
    allData.forEach(item => {
      const provinciaDpa = item.provinciaDpa;
      const currentCount = countMap.get(provinciaDpa) || 0;
      countMap.set(provinciaDpa, currentCount + 1);
    });

    return lugaresMuestra.map(lugar => {
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

  //**********************DATOS DE PORCENTAJES****************
  //totales del seguimiento
  porcentajesTotales = computed<CardPorcentaje[]>(() => {
    const allLugares = this.lugares();
    const allData = this.data();

    const provinciasMeta = new Set(allLugares.filter(l => l.provinciaDpa.trim().length === 2).map(l => l.provinciaDpa));
    const provinciasReal = new Set(allData.map(d => d.provinciaDpa));

    const cantonesMeta = new Set(allLugares.filter(l => l.cantonDpa.trim().length === 4).map(l => l.cantonDpa));
    const cantonesReal = new Set(allData.map(d => d.cantonDpa));

    const parroquiasMeta = new Set(allLugares.filter(l => l.parroquiaDpa.trim().length === 6).map(l => l.parroquiaDpa));
    const parroquiasReal = new Set(allData.map(d => d.parroquiaDpa));


    const resultados: CardPorcentaje[] = [
      {
        indId: 'provincias',
        indNombre: this.indicadoresMap().get('provincias')?.indNombre || 'provincias',
        planificado: provinciasMeta.size,
        ejecutado: provinciasReal.size,
        // porcentaje: (provinciasReal.size / provinciasMeta.size) * 100
      },
      {
        indId: 'cantones',
        indNombre: this.indicadoresMap().get('cantones')?.indNombre || 'cantones',
        planificado: cantonesMeta.size,
        ejecutado: cantonesReal.size,
        // porcentaje: (cantonesReal.size / cantonesMeta.size) * 100
      },
      {
        indId: 'parroquias',
        indNombre: this.indicadoresMap().get('parroquias')?.indNombre || 'parroquias',
        planificado: parroquiasMeta.size,
        ejecutado: parroquiasReal.size,
        // porcentaje: (parroquiasReal.size / parroquiasMeta.size) * 100
      }
    ];

    return resultados;
  });

  porcentajesMetaValor = (ubicacion: string) => computed<CardPorcentaje[]>(() => {
    const allIndicadores = this.indicadores();
    const indicadoresProcess = allIndicadores
      .filter(item => item.indUbicacion === ubicacion)
      .sort((a, b) => a.indOrden - b.indOrden);
    const dataToProcess = this.filterData();
    const metaToProcess = this.filterMetas();

    const resultados: CardPorcentaje[] = indicadoresProcess.map(indicador => {
      const valor = dataToProcess
        .filter(item => item.indId === indicador.indId)
        .reduce((sum, item) => sum + (parseFloat(item.valValor) || 0), 0);

      const avanceInd = this.filterAvances()
        .filter(item => item.indId === indicador.indId)
        .reduce((sum, item) => sum + (parseFloat(item.avaValor) || 0), 0);
      // console.log(this.avances().map(item => item.indId));

      console.log(avanceInd);
      const real = valor + avanceInd;

      let meta = 0;
      if (indicador.indTipo.localeCompare('% meta') == 0) {
        meta = metaToProcess
          .filter(item => item.indId === indicador.indId)
          .reduce((sum, item) => sum + (parseFloat(item.metValor) || 0), 0);
      } else {
        const porcetajeObjetivo = indicador.indTipo.replace('% ', '');
        meta = dataToProcess
          .filter(item => item.indId === porcetajeObjetivo)
          .reduce((sum, item) => sum + (parseFloat(item.valValor) || 0), 0);
      }

      // const porcentaje = meta > 0 ? (real / meta) * 100 : 0;

      return {
        indId: indicador.indId,
        indNombre: indicador.indNombre,
        planificado: meta,
        ejecutado: real,
        // porcentaje: parseFloat(porcentaje.toFixed(1))
      };
    });
    return resultados;
  });

  promedios = (ubicacion: string) => computed<CardPromedio[]>(() => {
    const allIndicadores = this.indicadores();
    const indicadoresProcess = allIndicadores
      .filter(item => item.indUbicacion === ubicacion)
      .sort((a, b) => a.indOrden - b.indOrden);
    const dataToProcess = this.filterData();

    const resultados: CardPromedio[] = indicadoresProcess.map(indicador => {
      const valoresPromedio = dataToProcess
        .filter(item => item.indId === indicador.indId)
        .map(item => parseFloat(item.valValor) || 0);

      const valoresMinimo = dataToProcess
        .filter(item => item.indId === indicador.indId)
        .map(item => parseFloat(item.valValorUno) || 0);

      const valoresMaximo = dataToProcess
        .filter(item => item.indId === indicador.indId)
        .map(item => parseFloat(item.valValorDos) || 0);

      const promedio = valoresPromedio.length > 0
        ? valoresPromedio.reduce((sum, value) => sum + value, 0) / valoresPromedio.length
        : 0;

      const minimo = valoresMinimo.length > 0
        ? Math.min(...valoresMinimo)
        : 0;

      const maximo = valoresMaximo.length > 0
        ? Math.max(...valoresMaximo)
        : 0;

      return {
        indId: indicador.indId,
        indNombre: indicador.indNombre,
        promedio: promedio,
        minimo: minimo,
        maximo: maximo,
      };
    });
    return resultados;
  });
}
