import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { IDepartment } from 'src/app/Models/IDepartment';
import { DepartmentServiceService } from 'src/app/Services/department-service.service';
import { LoginComponent } from '../../Auth-Components/login/login.component';


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

  constructor(public dialog: MatDialog ,private departmentService : DepartmentServiceService) {
   this.departmentService.getAllDepartments().subscribe(
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
    this.dialog.open(LoginComponent, {
      width:'30%'
    }).afterClosed().subscribe(val => {
      if(val=='Save'){
        this.getAllDepartment();
      }
    })
  }

  getAllDepartment(){
    this.departmentService.getAllDepartments().subscribe(departments =>{
      this.dataSource = new MatTableDataSource(departments);
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;
      // this.prdList=products;
    })
  }

  deleteDepartment(depId:number){
    this.departmentService.deleteDepartment(depId).subscribe(departments =>{
      alert("Department Deleted");
      this.departmentService.getAllDepartments().subscribe(departments =>{
        this.dataSource = new MatTableDataSource(departments);
        this.dataSource.paginator=this.paginator;
        this.dataSource.sort=this.sort;
        // this.prdList=products;
      })
    })
  }

editDepartment(row:any){
  this.dialog.open(LoginComponent,{
    width:'30%',
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
