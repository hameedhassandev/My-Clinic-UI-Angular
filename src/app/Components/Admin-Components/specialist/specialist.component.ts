import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Specialist } from 'src/app/Models/Specialist';
import { SpecialistServiceService } from 'src/app/Services/specialist-service.service';
import { FormSpecialistComponent } from '../forms-components/form.specialist/form.specialist.component';

@Component({
  selector: 'app-specialist',
  templateUrl: './specialist.component.html',
  styleUrls: ['./specialist.component.css']
})
export class SpecialistComponent implements OnInit {
  displayedColumns: string[] = ['id','specialistName', 'departmentName','action'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  SpecialistList : Specialist[] = [];
  SpecialistListByDepId :any;
  errMassage:any;
  constructor(public _dialog:MatDialog, private _specialistService : SpecialistServiceService) {

  }
  ngOnInit(): void {
    this.getAllSpecialists();    
    this.getAllSpecialistByDepartmentId();
    }

  

getAllSpecialists(){
  
  this._specialistService.getAllSpecialistsWithDepartment().subscribe(specialists =>{
    this.dataSource = new MatTableDataSource(specialists);
    this.dataSource.paginator=this.paginator;
    this.dataSource.sort=this.sort;
  })
}

getAllSpecialistByDepartmentId(){
this._specialistService.getAllSpecialistByDepartmentId(1).subscribe(sp=>{
    this.SpecialistListByDepId = sp;
  }
)
console.log(this.SpecialistListByDepId)
}

openDialog() {
  this._dialog.open( FormSpecialistComponent, {
    width:'40%',
    height:'55%'
  }).afterClosed().subscribe(val => {
    if(val=='Add'){
      this.getAllSpecialists();
    }
  })
}
editSpecialist(row:any){
  this._dialog.open(FormSpecialistComponent,{
    width:'40%',
    height:'55%'
  }).afterClosed().subscribe(val=>{
    if(val == 'Update'){
      this.getAllSpecialists();
    }
  })
}
deleteSpecialist(id:number){
  this._specialistService.deleteSpecialist(id).subscribe(specialists =>{
    alert("Specialist Deleted");
    this._specialistService.getAllSpecialistsWithDepartment().subscribe(specialists =>{
      this.dataSource = new MatTableDataSource(specialists);
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;
    })
  })
}
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}
}
