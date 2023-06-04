import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Agency } from 'src/app/core/models';
import {} from 'googlemaps';

@Component({
  selector: 'app-agency-map',
  templateUrl: './agency-map.component.html'
})
export class AgencyMapComponent implements OnInit {
  center: google.maps.LatLngLiteral;
  marker: any;
  agency: Agency;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.agency = data.agency;
    this.marker = {
      position: { lat: this.agency.lon, lng: this.agency.lat },      
      title: this.agency.agencia,
    };
  }

  ngOnInit(): void {
    this.center = { lat: this.agency.lon, lng: this.agency.lat };
  }
}
