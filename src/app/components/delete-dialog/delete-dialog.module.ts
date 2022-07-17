import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { DeleteDialogComponent } from './delete-dialog.component';


@NgModule({
  declarations: [
    DeleteDialogComponent
  ],
  imports: [
    SharedModule
  ]
})

export class DeleteDialogModule {

}
