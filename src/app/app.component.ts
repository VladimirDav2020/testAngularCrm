import { Component, OnInit } from '@angular/core';
import { StateService } from './services/state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private _stateService: StateService,) {}

  ngOnInit(): void {
    this._stateService.getCarsArr().subscribe({
      next: (r) => {},
      error: (error) => console.log(error)
    });
  }

}
