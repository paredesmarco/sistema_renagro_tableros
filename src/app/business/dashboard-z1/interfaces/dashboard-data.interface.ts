export interface DashboardData {
  valId: number;
  indId: string;
  valParroquia: string;
  valPoligono: number;
  valCategoria: null | string;
  valValor: number;
  valValorUno: null | number;
  valValorDos: null | number;

  indNombre?: string;
  indTipo?: string;
  provinciaDpa?: string;
  cantonDpa?: string;
  parroquiaDpa?: string;
}