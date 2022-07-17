import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StateService } from 'src/app/services/state.service';
import { Car } from 'src/app/types/types';
import { ApiService } from '../../services/api.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { ShowCardDialogComponent } from '../show-card-dialog/show-card-dialog.component';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})

export class CatalogComponent implements OnInit, OnDestroy {
  public loading: boolean = true;
  public carsList: Array<Car> = [];
  public searchValue: string = '';
  public selectValue: string = '';
  public optionsArrForSelect: Array<{value: string, option:string}> = [
    {
      value: 'Name',
      option: 'Имя'
    },
    {
      value: 'Currency',
      option: 'Валюта'
    },
    {
      value: 'Cylinders',
      option: 'Количество цилиндров'
    },
    {
      value: 'Displacement',
      option: 'Объем двигателя'
    },
    {
      value: 'Horsepower',
      option: 'Количество лошадиных сил'
    },
    {
      value: 'Miles_per_Gallon',
      option: 'MpG'
    },
    {
      value: 'Acceleration',
      option: 'Ускорение'
    },
    {
      value: 'Origin',
      option: 'Страна производитель'
    },
    {
      value: 'Price',
      option: 'Цена'
    },
    {
      value: 'Weight_in_lbs',
      option: 'Вес автом'
    },
    {
      value: 'Year',
      option: 'Год производства'
    },
  ];

  private _subscriptions: Array<any> = [];

  constructor(
    private _apiService: ApiService,
    private _stateService: StateService,
    public dialog: MatDialog,
  ) { }

  ngOnDestroy(): void {
    this._subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  ngOnInit(): void {
    this.loading = true;
    this._subscriptions.push(
      this._stateService.carsArr.subscribe({
        next: (result) => {
          this.carsList = result;
          this.loading = false;
        },
        error: (error) => console.log(error)
      })
    );
  }

  public openDeleteDialog(event: Event, id: number): void {
    event.stopPropagation();
    let dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        id
      }
    });

    this._subscriptions.push(
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this._apiService.deleteCar(id).subscribe(result => {
            this.carsList.forEach((element, index) => {
              if(element['id'] == id) {
                this.carsList.splice(index, 1);
              }
            });
          })
        }
      })
    );
  }

  public openCardDialog(car: Car): void {
    let dealogRef = this.dialog.open(ShowCardDialogComponent, {
      data: {
      car
      }
    });
  }
  
}
