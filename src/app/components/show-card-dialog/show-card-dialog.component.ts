import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Car } from 'src/app/types/types';

@Component({
  selector: 'app-show-card-dialog',
  templateUrl: './show-card-dialog.component.html',
  styleUrls: ['./show-card-dialog.component.scss']
})
export class ShowCardDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:{
      car: Car;
    },
  ) { }

}
