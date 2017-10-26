import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { FormControlComponent } from './form-control/form-control.component';

// Material
import { MdInputModule, MdCardModule, MdInputDirective, MdButtonModule, MdCheckboxModule, MdSelectModule } from '@angular/material';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DataSource, CdkTableModule } from '@angular/cdk';
import { FormgroupComponent } from './formgroup/formgroup.component';
import { FormbuilderComponent } from './formbuilder/formbuilder.component';
import { LoginComponent } from './login/login.component';

// Guard
import { RoleGuardService } from './role-guard.service';
import { AuthServiceService } from './auth-service.service';

// Components
import { StudentInfoComponent } from './student-info/student-info.component';
import { CompanyInfoComponent } from './company-info/company-info.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';

@NgModule({
  declarations: [
    AppComponent,
    FormControlComponent,
    FormgroupComponent,
    FormbuilderComponent,
    LoginComponent,
    StudentInfoComponent,
    CompanyInfoComponent,
    NavbarComponent,
    SidemenuComponent,
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule,
    FormsModule, ReactiveFormsModule,
    HttpModule,
    MdInputModule, MdCardModule, NoopAnimationsModule,
    MdButtonModule, MdCheckboxModule, MdSelectModule
  ],
  providers: [RoleGuardService, AuthServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
