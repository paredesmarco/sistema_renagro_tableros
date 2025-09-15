import { Component, AfterViewInit, viewChild, ElementRef, inject } from '@angular/core';
import * as L from 'leaflet';
import { DataService } from '../../services/data-service';

// Ajustar los íconos para Angular
const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';

L.Marker.prototype.options.icon = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});

@Component({
  selector: 'app-map-view',
  standalone: true,
  imports: [],
  templateUrl: './map-view.component.html',
  styleUrl: './map-view.component.css'
})
export class MapViewComponent implements AfterViewInit {
  private map!: L.Map;
  private dataService = inject(DataService);

  ngAfterViewInit(): void {
    this.cargaMapa();
  }


  private cargaMapa(): void {
    const seleccionadoDpa = this.dataService.seleccionadoDpa();
    console.log('cargaMapa', seleccionadoDpa);
    this.initMap();
    this.loadPolygons();
  }


  private initMap(): void {
    this.map = L.map('map', {
      center: [-0.3306539, -78.6667172],
      zoom: 8,
    });

    L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
      attribution: `markiup.com ${this.dataService.seleccionadoDpa()}`,
      maxZoom: 15,
    }).addTo(this.map);
  }

  private loadPolygons(): void {
    if (!this.map) {
      console.error('El mapa no ha sido inicializado.');
      return;
    }

    const polygons = this.dataService.lugaresPresenta();
    // console.log(polygons);

    polygons.forEach(polygon => {
      fetch(`assets/polygons/${polygon.parroquiaDpa}.geojson`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`No se pudo cargar el archivo GeoJSON: ${polygon.parroquiaDpa}`);
          }
          return response.json();
        })
        .then(geoJsonData => {
          let color = polygon.estado == 'ok' ? '#2c6e49' :
            polygon.estado == 'err' ? '#9d0208' :
              polygon.estado == 'war' ? '#ff9500' : '#ffffff';

          const geoJsonLayer = L.geoJSON(geoJsonData, {
            style: {
              color: '#000000',
              weight: 2,
              opacity: 0.65,
              fillColor: color,
              fillOpacity: 0.4
            }
          }).addTo(this.map!);

          // Agregamos el evento de click al polígono
          geoJsonLayer.on('click', (e) => {
            const polygonCode = polygon.parroquiaDpa;
            console.log('Polígono seleccionado:', polygonCode);
            // Actualizamos la variable de la dpa seleccionada en el servicio
            this.dataService.seleccionadoDpa.set(polygonCode);
          });

          // Agregamos el evento de click al polígono
          geoJsonLayer.on('dblclick', (e) => {
            const polygonCode = polygon.parroquiaDpa;
            console.log('Polígono doble seleccionado:', polygonCode);
            // Actualizamos la variable de la dpa seleccionada en el servicio
            this.dataService.seleccionadoDpa.set(polygonCode);
            this.dataService.padreDpa.set(polygonCode);
          });
        })
        .catch(error => {
          console.error(`Error al cargar el polígono ${polygon.parroquiaDpa}:`, error);
        });
    });
  }
}
