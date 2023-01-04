import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthSerciceService } from 'src/app/Services/auth-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  @Output () toggleSidebarForMe:EventEmitter<any>=new EventEmitter();

  AdminName:string = '';


  constructor(private authService:AuthSerciceService) {}
  ngOnInit(): void {
    this.AdminName = this.authService.GetUser().userName
  }

  toggleSidebar(){
     this.toggleSidebarForMe.emit();
  }

  Logout(){
    this.authService.Logout();
  }
}
