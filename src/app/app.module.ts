import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";

import { DxTemplateModule, DxDataGridModule } from "devextreme-angular";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlatoComponent } from './plato/plato.component';
import { PlatoFormComponent } from './plato/plato-form/plato-form.component';


@NgModule({
  declarations: [
    AppComponent,
    PlatoComponent,
    PlatoFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		HttpClientModule,
		MatButtonModule,
		MatIconModule,
		MatFormFieldModule,
		MatInputModule,
		MatSelectModule,
		MatDatepickerModule,
		MatDialogModule,
		FormsModule,
		ReactiveFormsModule,
		DxTemplateModule,
		DxDataGridModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
