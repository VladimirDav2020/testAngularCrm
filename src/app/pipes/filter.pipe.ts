import { Pipe, PipeTransform } from '@angular/core';
import { Car } from '../types/types';

@Pipe({ name: 'myFilter' })

export class FilterPipe implements PipeTransform {

  constructor() {}

  transform(value: any, ...args: any[]): Array<Car> {
    let tempArr = value;
    if (args[0][1] != '' && args[0][0] != '') {
      tempArr = value.filter((car: any) => {
        if (car[args[0][1]] == null) car[args[0][1]] = 0;
        return car[args[0][1]].toString().toLowerCase().includes(args[0][0].toLowerCase());
      });
    }
    return tempArr;
  }

}
