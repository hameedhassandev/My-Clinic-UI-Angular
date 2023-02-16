import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Area } from 'src/app/Models/Area';
import { AreaServiceService } from 'src/app/Services/area-service.service';
import { AreaFormComponent } from '../forms-components/area-form/area-form.component';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit {
  displayedColumns: string[] = ['id','areaName', 'city','action'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  areaList : Area[] = [];
  SpecialistListByDepId :any;
  errMassage:any;
  constructor(public _dialog:MatDialog, private _areaServ : AreaServiceService) {

  }
  ngOnInit(): void {
    this.getAllAreas();    
    }

  

    getAllAreas(){
  
  this._areaServ.getAllAreas().subscribe(areas =>{
    this.dataSource = new MatTableDataSource(areas);
    this.dataSource.paginator=this.paginator;
    this.dataSource.sort=this.sort;
  })
}



openDialog() {
  this._dialog.open( AreaFormComponent, {
    width:'40%',
    height:'55%'
  }).afterClosed().subscribe(val => {
    if(val=='Add'){
      this.getAllAreas();
    }
  })
}
editArea(row:any){
  this._dialog.open(AreaFormComponent,{
    width:'40%',
    height:'55%',
    data:row
  }).afterClosed().subscribe(val=>{
    if(val == 'Update'){
      this.getAllAreas();
    }
  })
}
// deleteArea(id:number){
//   this._areaServ.deleteArea(id).subscribe({
    
//     alert("Area Deleted");
//   })
// }
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}
}
