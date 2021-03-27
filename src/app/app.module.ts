import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule} from '@angular/fire/firestore';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { ProjectAddComponent } from './components/project-add/project-add.component';
import { environment } from '../environments/environment';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ProjectsEffects } from './store/projects/projects.effects';
import { appReducers } from './store/reducers';
import { ProjectFacade } from './common/facades/project.facade';

@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
    ProjectListComponent,
    ProjectAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forFeature([ProjectsEffects])
  ],
  providers: [ProjectFacade],
  bootstrap: [AppComponent]
})
export class AppModule { }
