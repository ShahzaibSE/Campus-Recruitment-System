import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { StudentComponent } from './student/student.component';
import { CompanyComponent } from './company/company.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { CreateUserComponent } from './create-user/create-user.component';

//Routes
import {routes} from './app.routes';
import { MenuComponent } from './menu/menu.component';
import { StudentEntryComponent } from './student-entry/student-entry.component';

//Services
import {AuthService} from './auth.service';
import { CreateUserService } from './create-user.service';

//Firebase Module
import { AngularFireDatabaseProvider, AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2'; 
import fireConfig  from './firebaseConfig';

//------Material DEsign Libraries-------//
import 'materialize-css';    //Materialize Dependency
import { MaterializeModule } from 'angular2-materialize';  //Materialize library
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdButtonModule, MdCardModule, MdMenuModule, MdToolbarModule, MdIconModule, MdSelectModule, MdSelectionModule } from '@angular/material';
import { NoopAnimationPlayer } from '@angular/animations';

@NgModule({
  declarations: [
    AppComponent,
    AdminLoginComponent,
    StudentComponent,
    CompanyComponent,
    StudentComponent,
    CompanyComponent,
    DashboardComponent,
    LoginComponent,
    MenuComponent,
    StudentEntryComponent,
    CreateUserComponent
  ],
  imports: [
    MaterializeModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(fireConfig),
    AngularFireDatabaseModule,
    RouterModule.forRoot(routes),
    MdButtonModule,
    MdCardModule,
    MdMenuModule,
    MdSelectModule,
    MdSelectionModule,
    MdToolbarModule,
    MdIconModule
  ],
  providers: [AuthService,CreateUserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
