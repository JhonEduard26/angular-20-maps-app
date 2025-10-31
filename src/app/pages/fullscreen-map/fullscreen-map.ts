import {
  AfterViewInit,
  Component,
  effect,
  ElementRef,
  signal,
  viewChild,
} from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { environment } from '../../../environments/environment';
import { DecimalPipe, JsonPipe } from '@angular/common';

mapboxgl.accessToken = environment.mapboxToken;

@Component({
  selector: 'app-fullscreen-map',
  imports: [DecimalPipe, JsonPipe],
  templateUrl: './fullscreen-map.html',
  styles: `
    div {
      width: 100vw;
      height: calc(100vh - 65px);
    }
    #controls {
      background-color: white;
      padding: 10px;
      border-radius: 5px;
      position: fixed;
      bottom: 26px;
      right: 20px;
      z-index: 9999;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      border: 1px solid #e2e8f0;
      width: 250px;
    }
  `,
})
export class FullscreenMap implements AfterViewInit {
  divElement = viewChild<ElementRef>('map');
  zoom = signal<number>(10);
  map = signal<mapboxgl.Map | null>(null);
  coordinates = signal({
    lat: 4.654,
    lng: -74.08,
  });

  zoomEffect = effect(() => {
    if (!this.map()) return;

    this.map()?.setZoom(this.zoom());
  });

  ngAfterViewInit(): void {
    if (!this.divElement()) return;

    const element = this.divElement()?.nativeElement;
    const { lat, lng } = this.coordinates();

    const map = new mapboxgl.Map({
      container: element,
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [lng, lat], // starting position [lng, lat]
      zoom: this.zoom(), // starting zoom
    });

    this.mapListeners(map);
  }

  mapListeners(map: mapboxgl.Map) {
    map.on('zoomend', (event) => {
      const newZoom = event.target.getZoom();
      this.zoom.set(newZoom);
    });

    map.on('moveend', () => {
      const center = map.getCenter();
      this.coordinates.set(center);
    });

    map.addControl(new mapboxgl.FullscreenControl());
    map.addControl(new mapboxgl.NavigationControl());
    map.addControl(new mapboxgl.ScaleControl());

    this.map.set(map);
  }
}
