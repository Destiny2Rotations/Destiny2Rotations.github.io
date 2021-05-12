import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromApp from './store/app.reducer'
import { environment } from 'src/environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import {CommonEffects} from 'src/app/store/common/common.effects'
import { FormsModule } from '@angular/forms'

//angular material
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatExpansionModule} from '@angular/material/expansion'
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';

import { WeaponRollsComponent } from './components/weapon-rolls/weapon-rolls.component';
import { WeaponFilterPipe } from './pipes/weapon-filter.pipe';
import { AscendantChallengeComponent } from './components/ascendant-challenge/ascendant-challenge.component';
import { AlterSorrowsComponent } from './components/alter-sorrows/alter-sorrows.component';
import { CurseStrengthComponent } from './components/curse-strength/curse-strength.component';
import { SafePipe } from './pipes/safe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    WeaponRollsComponent,
    WeaponFilterPipe,
    SafePipe,
    AscendantChallengeComponent,
    AlterSorrowsComponent,
    CurseStrengthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([CommonEffects]),
    HttpClientModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    BrowserAnimationsModule,
    FormsModule,
    //angular material
    MatToolbarModule,
    MatExpansionModule,
    MatCardModule,
    MatTableModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
