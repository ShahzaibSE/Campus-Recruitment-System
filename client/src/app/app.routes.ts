import {Route,Routes} from '@angular/router';

//Import Components
import {LoginComponent} from './login/login.component';
import {AdminLoginComponent} from './admin-login/admin-login.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {StudentComponent} from './student/student.component';
import {CompanyComponent} from './company/company.component';
import {CreateUserComponent} from './create-user/create-user.component';

export const routes:Routes = [
  // {path:'',component:AdminLoginComponent},
  {path:'login',component:LoginComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'student',component:StudentComponent},
  {path:'company',component:CompanyComponent},
  {path:'create',component:CreateUserComponent}
]