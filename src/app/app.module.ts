import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DetailComponent } from './detail/detail.component';
import { MatSliderModule } from '@angular/material/slider';

@NgModule({
  declarations: [AppComponent, HomeComponent, DetailComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, MatSliderModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
