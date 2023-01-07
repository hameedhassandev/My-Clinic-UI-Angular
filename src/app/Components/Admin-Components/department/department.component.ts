import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { IDepartment } from 'src/app/Models/IDepartment';
import { DepartmentServiceService } from 'src/app/Services/department-service.service';
import { FormDepartmentComponent } from '../form.department/form.department.component';


@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name','description','action'];
  dataSource!: MatTableDataSource<any>;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  departmentList : IDepartment[] = [];
  errMassage:any;

  constructor(public _dialog: MatDialog ,private _departmentService : DepartmentServiceService) {
   this._departmentService.getAllDepartments().subscribe(
    data=>{
     this.departmentList = data;
    },
    error=>{
     this.errMassage = error;
    }
   )
  }
  ngOnInit(): void {
    this.getAllDepartment();
  }

  openDialog() {
    this._dialog.open(FormDepartmentComponent, {
      width:'40%',
      height:'55%'
    }).afterClosed().subscribe(val => {
      if(val=='Add'){
        this.getAllDepartment();
      }
    })
  }

  getAllDepartment(){
    this._departmentService.getAllDepartments().subscribe(departments =>{
      this.dataSource = new MatTableDataSource(departments);
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;
    })
  }

  deleteDepartment(depId:number){
    this._departmentService.deleteDepartment(depId).subscribe(departments =>{
      alert("Department Deleted");
      this._departmentService.getAllDepartments().subscribe(departments =>{
        this.dataSource = new MatTableDataSource(departments);
        this.dataSource.paginator=this.paginator;
        this.dataSource.sort=this.sort;
      })
    })
  }

editDepartment(row:any){
  this._dialog.open(FormDepartmentComponent,{
    width:'40%',
    height:'55%',
    data:row
  }).afterClosed().subscribe(val => {
    if(val=='Update'){
      this.getAllDepartment();
    }
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
