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
// import { CommonContainerDirective } from './common-container.directive';
import { WorkbenchComponent } from './workbench/workbench.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DynamicCompDirectiveDirective } from './dyniamic-component-loader/dynamic-comp-directive.directive';
import { FullLayoutComponent } from './full-layout/full-layout.component';

// Service.
import { DynamicComponentService } from './shared/services/dynamic-component.service';

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
    WorkbenchComponent,
    DashboardComponent,
    DynamicCompDirectiveDirective,
    FullLayoutComponent,
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule,
    FormsModule, ReactiveFormsModule,
    HttpModule,
    MdInputModule, MdCardModule, NoopAnimationsModule,
    MdButtonModule, MdCheckboxModule, MdSelectModule
  ],
  providers: [RoleGuardService, AuthServiceService, DynamicComponentService],
  entryComponents: [CompanyInfoComponent, StudentInfoComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
