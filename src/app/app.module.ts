import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/Auth-Components/login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DoctorLayoutComponentComponent } from './Components/Doctor-Components/doctor-layout-component/doctor-layout-component.component';
import { AdminLayoutComponentComponent } from './Components/Admin-Components/admin-layout-component/admin-layout-component.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DoctorLayoutComponentComponent,
    AdminLayoutComponentComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
