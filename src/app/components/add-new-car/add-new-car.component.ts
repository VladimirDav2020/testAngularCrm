import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { StateService } from 'src/app/services/state.service';
import { Car } from 'src/app/types/types';

@Component({
  selector: 'app-add-new-car',
  templateUrl: './add-new-car.component.html',
  styleUrls: ['./add-new-car.component.scss']
})
export class AddNewCarComponent implements OnInit, OnDestroy {

  public carsArr: Array<Car> = [];
  public currencyOptions: Array<string> = ['USD', 'EUR'];
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
    private _stateService: StateService,
    private _apiService: ApiService
  ) { }

  ngOnDestroy(): void {
    this._subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  ngOnInit(): void {
    this._subscriptions.push(
      this._stateService.carsArr.subscribe(result => {
        this.carsArr = result;
      })
    )
  }

  public addNewCar(): void {
    let requestObject: any = {};
    for (let k in this.form.controls) {
      requestObject[k] = this.form.controls[k].value;
    }
    requestObject['Year'] = this.formateDate(requestObject['Year'].toLocaleDateString("en-US"));
    requestObject['id'] = this.carsArr[this.carsArr.length-1]['id'] + 1;
    this.saveNewCar(requestObject);
  }

  private saveNewCar(newObj: any): void {
    this._subscriptions.push(
      this._apiService.addNewCar(newObj).subscribe({
        next: (result) => {
          this.carsArr.push(newObj);
          this._stateService.carsArr.next(this.carsArr);
          this.form.reset();
        },
        error: (error) => console.log(error)
      })
    );
  }

  private formateDate(date: string): string {
    return date.split('/').reverse().join('-');
  }
  
}
