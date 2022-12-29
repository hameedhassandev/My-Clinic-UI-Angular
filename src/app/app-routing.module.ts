import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/Auth-Components/login/login.component';
import { DoctorLayoutComponentComponent } from './Components/Doctor-Components/doctor-layout-component/doctor-layout-component.component';
import { AdminLayoutComponentComponent } from './Components/Admin-Components/admin-layout-component/admin-layout-component.component';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'doctor', component:DoctorLayoutComponentComponent},
  {path:'admin', component:AdminLayoutComponentComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
