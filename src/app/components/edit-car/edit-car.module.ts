import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { SharedModule } from 'src/app/shared/shared.module';
import { EditCarComponent } from './edit-car.component';


@NgModule({
  declarations: [
    EditCarComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: '', component: EditCarComponent, pathMatch: 'full' },
    ])
  ],
  exports: [RouterModule],
  providers: [EditCarModule]
})

export class EditCarModule {

}
