import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { StateService } from 'src/app/services/state.service';
import { Car } from 'src/app/types/types';

@Component({
  selector: 'app-edit-car',
  templateUrl: './edit-car.component.html',
  styleUrls: ['./edit-car.component.scss']
})
export class EditCarComponent implements OnInit, OnDestroy {

  public currencyOptions: Array<string> = ['USD', 'EUR'];
  public cardId: number = 0;
  public carsArr: Array<Car> = [];
  public form: FormGroup = new FormGroup({
    Name: new FormControl('',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]
    ),
    Origin: new FormControl('',[Validators.required]),
    Horsepower: new FormControl('',
      [
        Validators.required, 
        Validators.min(1)
      ]
    ),
    Cylinders: new FormControl('',[Validators.required]),
    Miles_per_Gallon: new FormControl('',[Validators.required]),
    Price: new FormControl('',[Validators.required]),
    Weight_in_lbs: new FormControl('',[Validators.required]),
    Displacement: new FormControl('',[Validators.required]),
    Acceleration: new FormControl('',[Validators.required]),
    Currency: new FormControl('',[Validators.required]),
    Year: new FormControl('',[Validators.required]),
  });

  private _subscriptions: Array<any> = [];

  constructor(
    private activateRoute: ActivatedRoute,
    private _stateService: StateService,
    private _apiService: ApiService
  ) { }

  ngOnDestroy(): void {
    this._subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  ngOnInit(): void {
    this._subscriptions.push(
      this.activateRoute.params.subscribe(params=> this.cardId = +params['id'])
    );
    this._subscriptions.push(
      this._stateService.carsArr.subscribe(result => {
        this.carsArr = result;
        this.updateForm(this.searchCar(result));
      })
    );
  }

  public saveEdits(): void {
    let requestObject: any = {};
    for (let k in this.form.controls) {
      requestObject[k] = this.form.controls[k].value;
    }
    requestObject['Year'] = typeof(requestObject['Year']) == 'string' ? requestObject['Year']: this.formateDate(requestObject['Year'].toLocaleDateString("en-US"));
    requestObject['id'] = this.cardId;
    let car = this.carsArr.find((item: any) =>item.id === requestObject['id']);
    if (this.checkChanges(requestObject, car)) {
      this.saveChanges(requestObject);
    } else {
      return;
    }
  }

  private searchCar(arr: Array<Car>) {
    let car;
    arr.forEach((element: Car) => {
      if(element['id'] == this.cardId) {
        car = element;
      }
    });
    return car;
  }

  private updateForm(car: any): void {
    if (car != undefined) {
      for (let k in this.form.controls) {
        this.form.controls[k].setValue(car[k]);
      }
    }
  }

  private formateDate(date: string): string {
    return date.split('/').reverse().join('-');
  }

  private saveChanges(newObj: any): void {
    let indx = this.carsArr.findIndex((item: any) =>item.id === newObj['id']);
    this.carsArr.splice(indx, 1, newObj)
    this._subscriptions.push(
      this._apiService.updateCar(newObj).subscribe({
        next: (result) => {
          this._stateService.carsArr.next(this.carsArr);
        },
        error: (error) => console.log(error)
      })
    );
  }

  private checkChanges(newObj: any, oldObj: any): boolean {
    let check: boolean = false;
    for(let k in oldObj) {
      if(oldObj[k] != newObj[k]) {
        check = true;
      }
    }
    return check;
  }

}
