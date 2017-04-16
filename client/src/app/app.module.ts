import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { StudentComponent } from './student/student.component';
import { CompanyComponent } from './company/company.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';

//Routes
import {routes} from './app.routes';
import { MenuComponent } from './menu/menu.component';
import { StudentEntryComponent } from './student-entry/student-entry.component';

//Services
import {AuthService} from './auth.service';

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
    StudentEntryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
