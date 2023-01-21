import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/Auth-Components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DoctorLayoutComponentComponent } from './Components/Doctor-Components/doctor-layout-component/doctor-layout-component.component';
import { AdminLayoutComponentComponent } from './Components/Admin-Components/admin-layout-component/admin-layout-component.component';
import { DepartmentComponent } from './Components/Admin-Components/department/department.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import{MatSidenavModule} from '@angular/material/sidenav';
import{MatToolbarModule}from '@angular/material/toolbar';
import{MatMenuModule}from '@angular/material/menu';
import{MatIconModule}from '@angular/material/icon';
import{MatDividerModule}from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatPaginatorModule} from '@angular/material/paginator';
import { NgSelectModule } from "@ng-select/ng-select";
import { HospitalComponent } from './Components/Admin-Components/hospital/hospital.component';
import { HeaderComponent } from './Components/Admin-Components/Dashboard/header/header.component';
import { SideNavComponent } from './Components/Admin-Components/Dashboard/side-nav/side-nav.component';
import { AdminHomeComponent } from './Components/Admin-Components/Dashboard/admin-home/admin-home.component';
import { AdminDashboardComponent } from './Components/Admin-Components/Dashboard/admin-dashboard/admin-dashboard.component';
import { FormDepartmentComponent } from './Components/Admin-Components/forms-components/form.department/form.department.component';
import { FormHospitalComponent } from './Components/Admin-Components/forms-components/form.hospital/form.hospital.component';
import { RegisterAsDoctorComponent } from './Components/Auth-Components/register-as-doctor/register-as-doctor.component';
import { RegisterAsVisitorComponent } from './Components/Auth-Components/register-as-visitor/register-as-visitor.component';
import { ConfirmationMailComponent } from './Components/Auth-Components/confirmation-mail/confirmation-mail.component';
import { ForgetPasswordComponent } from './Components/Auth-Components/forget-password/forget-password.component';
import { SpecialistComponent } from './Components/Admin-Components/specialist/specialist.component';
import { FormSpecialistComponent } from './Components/Admin-Components/forms-components/form.specialist/form.specialist.component';
import { DoctorFiltersComponent } from './Components/Visitor-Component/doctor-filters/doctor-filters.component';
import { NavigationBarComponent } from './Components/Shared-Components/navigation-bar/navigation-bar.component';
import { FooterComponent } from './Components/Shared-Components/footer/footer.component';
import { MainHomeComponent } from './Components/Visitor-Component/main-home/main-home.component';
import { HomeComponent } from './Components/Shared-Components/home/home.component';
import { DoctorComponent } from './Components/Shared-Components/doctor/doctor.component';
import { MatSelectModule } from '@angular/material/select';
import {MatStepperModule} from '@angular/material/stepper';


  
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DoctorLayoutComponentComponent,
    AdminLayoutComponentComponent,
    DepartmentComponent,
    HospitalComponent,
    HeaderComponent,
    SideNavComponent,
    AdminHomeComponent,
    AdminDashboardComponent,
    FormDepartmentComponent,
    FormHospitalComponent,
    RegisterAsDoctorComponent,
    RegisterAsVisitorComponent,
    ConfirmationMailComponent,
    ForgetPasswordComponent,
    SpecialistComponent,
    FormSpecialistComponent,
    DoctorFiltersComponent,
    NavigationBarComponent,
    FooterComponent,
    MainHomeComponent,
    HomeComponent,
    DoctorComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatInputModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSortModule,
    MatSlideToggleModule,
    NgSelectModule,
    MatStepperModule

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
