import {
  Component,
  AfterViewInit,
  ElementRef,
  Output,
  EventEmitter,
} from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map-picker',
  imports: [],
  templateUrl: './map-picker.html',
  styleUrl: './map-picker.css'
})
export class MapPicker implements AfterViewInit {
  @Output() locationSelected = new EventEmitter<string>();
  private map!: L.Map;

  ngAfterViewInit(): void {
    this.map = L.map('leafletMap').setView([30.0444, 31.2357], 6); // Cairo

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(this.map);

    this.map.on('click', (e: L.LeafletMouseEvent) => {
      const lat = e.latlng.lat;
      const lng = e.latlng.lng;
      const link = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}`;
      this.locationSelected.emit(link);

      L.marker([lat, lng])
        .addTo(this.map)
        .bindPopup('الموقع المختار')
        .openPopup();
    });
  }
}
