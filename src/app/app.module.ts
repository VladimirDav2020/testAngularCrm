import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AddNewCarModule } from './components/add-new-car/add-new-car.module';
import { SharedModule } from './shared/shared.module';
import { CatalogModule } from './components/catalog/catalog.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { EditCarModule } from './components/edit-car/edit-car.module';
import { ShowCardDialogModule } from './components/show-card-dialog/show-card-dialog.module';
import { DeleteDialogModule } from './components/delete-dialog/delete-dialog.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AddNewCarModule,
    CatalogModule,
    EditCarModule,
    ShowCardDialogModule,
    DeleteDialogModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
