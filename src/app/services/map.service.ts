import { Injectable } from '@angular/core';
import { RelayPoint } from '../Model/RelayPointModel';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private geocoder: google.maps.Geocoder;

  constructor() {
    this.geocoder = new google.maps.Geocoder();
  }

   findClosestRelayPoints(origin:google.maps.LatLngLiteral, relayPoints: any[], radius: number): RelayPoint[] {
    
    
    relayPoints.forEach(async (relayPoint) => {
      const destination :google.maps.LatLngLiteral= relayPoint.position;
      const distance = google.maps.geometry.spherical.computeDistanceBetween(origin, destination);

      if (distance <= radius * 1000) {
        relayPoint.distance = distance;
        relayPoint.position = destination;
      } else {
        relayPoint.distance = null;
      }
    });

   return  relayPoints = relayPoints.filter(rp => rp.distance !== null).sort((a, b) => a.distance - b.distance);
  }
  
    async getPlaceIdByLatLng(lat: number, lng: number): Promise<string> {
      return new Promise((resolve, reject) => {
        const latLng = new google.maps.LatLng(lat, lng);
    
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ location: latLng }, (results, status) => {
          if (status === google.maps.GeocoderStatus.OK && results && results.length > 0) {
            resolve(results[0].place_id);
          } else {
            reject(`Reverse geocoding was not successful for the following reason: ${status}`);
          }
        });
      });
    }
    
    async getPlaceDetails(placeId: string): Promise<google.maps.places.PlaceResult> {
      return new Promise((resolve, reject) => {
        const request: google.maps.places.PlaceDetailsRequest = {
          placeId,
          fields: ['name', 'formatted_address', 'opening_hours']
        };
    
        const service = new google.maps.places.PlacesService(document.createElement('div'));
        service.getDetails(request, (result, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && result) {
            resolve(result);
          } else {
            reject(`Places details request was not successful for the following reason: ${status}`);
          }
        });
      });
    }
    

  async getLatLng(address: string): Promise<google.maps.LatLngLiteral> {
    return new Promise((resolve, reject) => {
      this.geocoder.geocode({ address }, (results, status) => {
        if (status === 'OK') {
          if (results && results.length > 0) { 
          const location = results[0].geometry.location;
          resolve({ lat: location.lat(), lng: location.lng() });
        } else {
          reject('No results found');
        }
        } else {
          reject(`Geocode was not successful for the following reason: ${status}`);
        }
      });
    });
  }
}

