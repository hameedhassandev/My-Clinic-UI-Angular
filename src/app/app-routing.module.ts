import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/Auth-Components/login/login.component';
import { DoctorLayoutComponentComponent } from './Components/Doctor-Components/doctor-layout-component/doctor-layout-component.component';
import { AdminLayoutComponentComponent } from './Components/Admin-Components/admin-layout-component/admin-layout-component.component';
import { DepartmentComponent } from './Components/Admin-Components/department/department.component';
import { HospitalComponent } from './Components/Admin-Components/hospital/hospital.component';
import { AdminHomeComponent } from './Components/Admin-Components/Dashboard/admin-home/admin-home.component';
import { AdminDashboardComponent } from './Components/Admin-Components/Dashboard/admin-dashboard/admin-dashboard.component';
import { SpecialistComponent } from './Components/Admin-Components/specialist/specialist.component';
import { DoctorFiltersComponent } from './Components/Visitor-Component/doctor-filters/doctor-filters.component';
import { MainHomeComponent } from './Components/Visitor-Component/main-home/main-home.component';
import { HomeComponent } from './Components/Shared-Components/home/home.component';
import { DoctorComponent } from './Components/Shared-Components/doctor/doctor.component';
import { RegisterAsDoctorComponent } from './Components/Auth-Components/register-as-doctor/register-as-doctor.component';
import { ConfirmationMailComponent } from './Components/Auth-Components/confirmation-mail/confirmation-mail.component';
import { DoctorDetailsComponent } from './Components/Shared-Components/doctor-details/doctor-details.component';
import { RegisterAsVisitorComponent } from './Components/Auth-Components/register-as-visitor/register-as-visitor.component';
import { ConfirmedDoctorsComponent } from './Components/Admin-Components/Dashboard/confirmed-doctors/confirmed-doctors.component';
import { NotConfirmedDoctorsComponent } from './Components/Admin-Components/Dashboard/not-confirmed-doctors/not-confirmed-doctors.component';
import { DoctorHomeComponent } from './Components/Doctor-Components/doctor-home/doctor-home.component';
import { RateAndReviewComponent } from './Components/Doctor-Components/rate-and-review/rate-and-review.component';
import { VisitorBookingComponent } from './Components/Doctor-Components/visitor-booking/visitor-booking.component';
import { AppointmentsComponent } from './Components/Doctor-Components/appointments/appointments.component';
import { BookDoctorComponent } from './Components/Visitor-Component/book-doctor/book-doctor.component';
import { AuthGuard } from './Guards/auth.guard';
import { NotAuthGuard } from './Guards/not-auth.guard';
import { UserRoleGuard } from './Guards/user-role.guard';
import { RoleNames } from './ViewModels/RoleNames';

const routes: Routes = [


  {path:'admin', component:AdminLayoutComponentComponent,
  children: [
    {path:'', redirectTo:'home', pathMatch:'full'},
    {path:'home', component:AdminHomeComponent, canActivate:[AuthGuard,UserRoleGuard],data:{roles:[RoleNames.AdminRole]}},
    {path:'admin-dashboard', component:AdminDashboardComponent, canActivate:[AuthGuard,UserRoleGuard],data:{roles:[RoleNames.AdminRole]}},
    {path:'department', component:DepartmentComponent, canActivate:[AuthGuard,UserRoleGuard],data:{roles:[RoleNames.AdminRole]}},
    {path:'hospital', component:HospitalComponent, canActivate:[AuthGuard,UserRoleGuard],data:{roles:[RoleNames.AdminRole]}},
    {path:'specialist', component:SpecialistComponent, canActivate:[AuthGuard,UserRoleGuard],data:{roles:[RoleNames.AdminRole]}},
    {path:'confirmed-doctors', component:ConfirmedDoctorsComponent, canActivate:[AuthGuard,UserRoleGuard],data:{roles:[RoleNames.AdminRole]}},
    

  ]},
  {path: '', component: MainHomeComponent, children:[
    {path: '', component: HomeComponent, pathMatch: 'full'},
    {path:'home', component:HomeComponent},
    {path:'login', component:LoginComponent},
    {path:'visitor-register', component:RegisterAsVisitorComponent},
    {path:'docotrs', component:DoctorComponent},
    {path:'docotr-register', component:RegisterAsDoctorComponent},
    {path:'confirm-email', component:ConfirmationMailComponent},
    {path:'home/all-doctors', component:DoctorFiltersComponent},
    {path:'home/doctor-details/:doctorId', component:DoctorDetailsComponent},
    {path:'home/book-doctor/:day/:doctorId', component:BookDoctorComponent,canActivate:[AuthGuard,UserRoleGuard],data:{roles:[RoleNames.PatientRole]}},
    

  ]},

  {path:'doctor', component:DoctorLayoutComponentComponent,
  children: [
    {path:'', redirectTo:'home', pathMatch:'full'},
    {path:'home', component:DoctorHomeComponent, canActivate:[AuthGuard,UserRoleGuard],data:{roles:[RoleNames.DoctorRole]}},
    {path:'rate-and-review', component:RateAndReviewComponent, canActivate:[AuthGuard,UserRoleGuard],data:{roles:[RoleNames.DoctorRole]}},
    {path:'visitor-booking', component:VisitorBookingComponent, canActivate:[AuthGuard,UserRoleGuard],data:{roles:[RoleNames.DoctorRole]}},
    {path:'manage-appointment', component:AppointmentsComponent, canActivate:[AuthGuard,UserRoleGuard],data:{roles:[RoleNames.DoctorRole]}},
    
    ]},
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
