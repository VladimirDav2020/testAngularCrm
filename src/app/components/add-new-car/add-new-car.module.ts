import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { SharedModule } from 'src/app/shared/shared.module';
import { AddNewCarComponent } from './add-new-car.component';

@NgModule({
  declarations: [
    AddNewCarComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: '', component: AddNewCarComponent, pathMatch: 'full' },
    ])
  ],
  exports: [RouterModule],
  providers: [AddNewCarModule]
})

export class AddNewCarModule {

}