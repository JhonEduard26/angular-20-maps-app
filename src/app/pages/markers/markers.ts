import { nanoid } from 'nanoid';
import {
  AfterViewInit,
  Component,
  ElementRef,
  signal,
  viewChild,
} from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { environment } from '../../../environments/environment';

mapboxgl.accessToken = environment.mapboxToken;

interface Marker {
  id: string;
  mapboxMarker: mapboxgl.Marker;
}

@Component({
  selector: 'app-markers',
  imports: [],
  templateUrl: './markers.html',
  styles: ``,
})
export class Markers implements AfterViewInit {
  divElement = viewChild<ElementRef>('map');
  map = signal<mapboxgl.Map | null>(null);
  markers = signal<Marker[]>([]);

  ngAfterViewInit(): void {
    if (!this.divElement()) return;

    const element = this.divElement()?.nativeElement;
    // const { lat, lng } = this.coordinates();

    const map = new mapboxgl.Map({
      container: element,
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-122, 37.7], // starting position [lng, lat]
      zoom: 10, // starting zoom
    });

    this.mapListeners(map);
  }

  createNewMarker(lngLat: mapboxgl.LngLat) {
    if (!this.map()) return;

    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );

    const marker = new mapboxgl.Marker({
      draggable: true,
      color: color,
    })
      .setLngLat(lngLat)
      .addTo(this.map()!);

    const newMarker: Marker = {
      id: nanoid(),
      mapboxMarker: marker,
    };

    this.markers.update((markers) => [newMarker, ...markers]);

    console.log(this.markers());
  }

  mapListeners(map: mapboxgl.Map) {
    map.on('click', (event) => {
      this.createNewMarker(event.lngLat);
    });

    this.map.set(map);
  }
}
