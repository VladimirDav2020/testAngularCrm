import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Observer } from 'rxjs';
import { Car } from '../types/types';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})

export class StateService {
  public carsArr: BehaviorSubject<any> = new BehaviorSubject([]);
  constructor(private _apiService: ApiService,) {}

  getCarsArr(): Observable<any> {
    return new Observable((observer: Observer<Array<Car>>) => {
      this._apiService.getAllCars().subscribe({
        next: (response) => {
          this.carsArr.next(response);
          observer.next(response);
          observer.complete();
        },
        error: (e) => console.log(e)
      });
    });
  }
}