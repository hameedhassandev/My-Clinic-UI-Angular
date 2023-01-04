import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/Auth-Components/login/login.component';
import { DoctorLayoutComponentComponent } from './Components/Doctor-Components/doctor-layout-component/doctor-layout-component.component';
import { AdminLayoutComponentComponent } from './Components/Admin-Components/admin-layout-component/admin-layout-component.component';
import { DepartmentComponent } from './Components/Admin-Components/department/department.component';
import { HospitalComponent } from './Components/Admin-Components/hospital/hospital.component';
import { AdminHomeComponent } from './Components/Admin-Components/Dashboard/admin-home/admin-home.component';
import { AdminDashboardComponent } from './Components/Admin-Components/Dashboard/admin-dashboard/admin-dashboard.component';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'doctor', component:DoctorLayoutComponentComponent},
  {path:'admin', component:AdminLayoutComponentComponent,
  children: [
    {path:'', redirectTo:'home', pathMatch:'full'},
    {path:'home', component:AdminHomeComponent},
    {path:'admin-dashboard', component:AdminDashboardComponent},
    {path:'department', component:DepartmentComponent},
    {path:'hospital', component:HospitalComponent},
  ]},
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
