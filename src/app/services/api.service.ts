import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car } from '../types/types';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private _httpClient: HttpClient) {}

  public getAllCars(): Observable<any> {
    return this._httpClient.get('http://localhost:3000/cars');
  }
  
  public deleteCar(id: number): Observable<any> {
    return this._httpClient.delete(`http://localhost:3000/cars/${id}`);
  }

  public addNewCar(car: Car): Observable<any> {
    return this._httpClient.post(`http://localhost:3000/cars`, car);
  }

  public updateCar(car: Car): Observable<any> {
    return this._httpClient.put(`http://localhost:3000/cars/${car['id']}`, car);
  }
}
