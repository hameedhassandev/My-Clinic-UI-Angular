import { Component, OnInit } from '@angular/core';
import { DropDownSelectService } from 'src/app/Services/drop-down-select.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  citiesList :any;

  constructor(private _ddlService: DropDownSelectService) {}
  ngOnInit(): void {
    this.getAlCities()
  }

  getAlCities(){
    this._ddlService.getAllCities().subscribe(Cities=>{
      this.citiesList = Cities;
  
      const mapped = Object.entries(this.citiesList).map(([id, name]) => ({id, name}));
       this.citiesList = mapped;
      console.log(this.citiesList);
      console.log(mapped);
    })
  }
  
  
}
