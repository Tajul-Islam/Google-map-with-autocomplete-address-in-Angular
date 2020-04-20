import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {} from 'googlemaps';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit , AfterViewInit{
  lat = 23.8103;
  lng = 90.4125;
  address: string;
  @ViewChild('map', {static: true}) mapElement: any;
  map: google.maps.Map;
  @ViewChild('addresstext' , {static: true}) addresstext: any;
  autocompleteInput: string;
  ngOnInit(): void {
    this.mapInitializer();
  }

  ngAfterViewInit() {
    this.getPlaceAutocomplete();
  }

  private getPlaceAutocomplete() {
    const autocomplete = new google.maps.places.Autocomplete(this.addresstext.nativeElement);
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
       const place = autocomplete.getPlace();
       this.address = place.formatted_address;
       this.lat = autocomplete.getPlace().geometry.location.lat();
       this.lng = autocomplete.getPlace().geometry.location.lng();
       this.mapInitializer();
    });
  }
  private mapInitializer(){
    const mapProperties = {
      center: new google.maps.LatLng(this.lat, this.lng),
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    const marker = new google.maps.Marker({
      position: new google.maps.LatLng(this.lat, this.lng),
      map: this.map,
      title: this.address
    });
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
    marker.setMap(this.map);
  }
}
