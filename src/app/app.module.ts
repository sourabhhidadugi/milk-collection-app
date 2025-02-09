import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MomentDateModule } from '@angular/material-moment-adapter';

import { AppRoutingModule } from './app-routing-module';
import { AppComponent } from './app.component';
import { MilkCollectionFormComponent } from './milk-collection-form/milk-collection-form.component';
import { CurrencyFormatterPipe } from './currency-formatter.pipe';


@NgModule({
  declarations: [
  ],
  imports: [
    AppComponent,
    HttpClientModule,
    MilkCollectionFormComponent,
    ReactiveFormsModule,
    CurrencyFormatterPipe,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatRadioModule,
    MatButtonModule,
    MomentDateModule,
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }