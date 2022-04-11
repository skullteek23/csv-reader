import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgxCsvParserModule } from 'ngx-csv-parser';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { UserAccountCreationComponent } from './user-account-creation/user-account-creation.component';
import { SeasonCreationComponent } from './season-creation/season-creation.component';
import { FixturesCreationComponent } from './fixtures-creation/fixtures-creation.component';
import { GroundCreationComponent } from './ground-creation/ground-creation.component';
import { StandingsCreationComponent } from './standings-creation/standings-creation.component';

@NgModule({
  declarations: [
    AppComponent,
    UserAccountCreationComponent,
    SeasonCreationComponent,
    FixturesCreationComponent,
    GroundCreationComponent,
    StandingsCreationComponent,
  ],
  imports: [
    BrowserModule,
    NgxCsvParserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
