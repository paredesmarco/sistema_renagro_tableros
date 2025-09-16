import { Component, AfterViewInit, viewChild, ElementRef, inject, effect } from '@angular/core';
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
export class MapViewComponent {
  private map!: L.Map;
  private dataService = inject(DataService);

  constructor() {
    effect(() => {
      this.dataService.padreDpa();
      this.cargaMapa();
    });
  }

  private cargaMapa(): void {
    // Limpiamos el mapa existente si ya está inicializado
    if (this.map) {
      this.map.eachLayer((layer) => {
        if (layer instanceof L.GeoJSON || layer instanceof L.TileLayer) {
          this.map.removeLayer(layer);
        }
      });
      // Destruimos la instancia del mapa para evitar errores
      this.map.remove();
    }

    this.initMap();
    this.loadPolygons();
  }

  private initMap(): void {
    const dpaSeleccionada = this.dataService.seleccionadoDpa();

    // Determinamos el centro y el nivel de zoom
    let center: L.LatLngExpression = [this.dataService.latitud(), this.dataService.longitud()];

    let zoomLevel = 8;
    if (dpaSeleccionada.length === 2) {
      zoomLevel = 9;
    } else if (dpaSeleccionada.length === 4) {
      zoomLevel = 10;
    } else if (dpaSeleccionada.length === 6) {
      zoomLevel = 11;
    }

    this.map = L.map('map', {
      center: center,
      zoom: zoomLevel,
    });

    L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
      attribution: `markiup.com ${dpaSeleccionada}`,
      maxZoom: 15,
    }).addTo(this.map);
  }

  private loadPolygons(): void {
    if (!this.map) {
      console.error('El mapa no ha sido inicializado.');
      return;
    }

    const polygons = this.dataService.lugaresPresenta();

    polygons.forEach(polygon => {
      fetch(`assets/polygons/${polygon.parroquiaDpa}.geojson`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`No se pudo cargar el archivo GeoJSON: ${polygon.parroquiaDpa}`);
          }
          return response.json();
        })
        .then(geoJsonData => {
          let color = polygon.estado === 'ok' ? '#2c6e49' :
            polygon.estado === 'err' ? '#9d0208' :
              polygon.estado === 'war' ? '#ff9500' : '#ffffff';

          const geoJsonLayer = L.geoJSON(geoJsonData, {
            style: {
              color: '#000000',
              weight: 2,
              opacity: 0.65,
              fillColor: color,
              fillOpacity: 0.4
            }
          }).addTo(this.map!);

          geoJsonLayer.on('click', (e) => {
            const polygonCode = polygon.parroquiaDpa.trim();
            this.dataService.latitud.set(e.latlng.lat);
            this.dataService.longitud.set(e.latlng.lng);
            this.map.panTo(e.latlng);
            this.dataService.seleccionadoDpa.set(polygonCode);
          });

          geoJsonLayer.on('contextmenu', (e) => {
            const polygonCode = polygon.parroquiaDpa.trim();
            if (polygonCode.length === 6) {
              this.dataService.padreDpa.set('');
              this.dataService.seleccionadoDpa.set('');
            } else {
              this.dataService.padreDpa.set(polygonCode);
            }
          });
        })
        .catch(error => {
          console.error(`Error al cargar el polígono ${polygon.parroquiaDpa}:`, error);
        });
    });
  }
}
