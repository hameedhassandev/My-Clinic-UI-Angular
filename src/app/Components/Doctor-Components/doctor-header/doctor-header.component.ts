import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthSerciceService } from 'src/app/Services/auth-service';

@Component({
  selector: 'app-doctor-header',
  templateUrl: './doctor-header.component.html',
  styleUrls: ['./doctor-header.component.css']
})
export class DoctorHeaderComponent implements OnInit {
 doctorName:any

  @Output () toggleSidebarForMe:EventEmitter<any>=new EventEmitter();


  constructor(private authService:AuthSerciceService) {}
  ngOnInit(): void {
    this.doctorName = this.authService.GetUser().userName
  }

  toggleSidebar(){
     this.toggleSidebarForMe.emit();
  }

  Logout(){
    this.authService.Logout();
  }
}
