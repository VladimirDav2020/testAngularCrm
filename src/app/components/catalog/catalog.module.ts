import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { FilterPipe } from 'src/app/pipes/filter.pipe';
import { SharedModule } from 'src/app/shared/shared.module';
import { CatalogComponent } from './catalog.component';


@NgModule({
  declarations: [
    CatalogComponent,
    FilterPipe
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: '', component: CatalogComponent, pathMatch: 'full' },
    ])
  ],
  exports: [RouterModule],
  providers: [CatalogModule]
})

export class CatalogModule {

}
