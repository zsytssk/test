import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { VoterComponent } from './hero/hero.component';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    VoterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
