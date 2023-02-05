import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthSerciceService } from 'src/app/Services/auth-service';

@Component({
  selector: 'app-doctor-header',
  templateUrl: './doctor-header.component.html',
  styleUrls: ['./doctor-header.component.css']
})
export class DoctorHeaderComponent implements OnInit {


  @Output () toggleSidebarForMe:EventEmitter<any>=new EventEmitter();


  constructor(private authService:AuthSerciceService) {}
  ngOnInit(): void {
  }

  toggleSidebar(){
     this.toggleSidebarForMe.emit();
  }


}
