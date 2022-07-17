import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CatalogComponent } from './components/catalog/catalog.component';

const routes: Routes = [
  {
    path: '', 
    component: CatalogComponent
  },
  {
    path: 'addcar',
    loadChildren: () => import('./components/add-new-car/add-new-car.module').then( m => m.AddNewCarModule)
  },
  {
    path: 'editcar/:id',
    loadChildren: () => import('./components/edit-car/edit-car.module').then( m => m.EditCarModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
