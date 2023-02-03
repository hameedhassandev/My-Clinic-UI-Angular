import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Doctor } from 'src/app/Models/Doctor';
import { DoctorService } from 'src/app/Services/doctor.service';

@Component({
  selector: 'app-confirmed-doctors',
  templateUrl: './confirmed-doctors.component.html',
  styleUrls: ['./confirmed-doctors.component.css']
})
export class ConfirmedDoctorsComponent implements OnInit {
  displayedColumns: string[] = ['image','email','fullName','phoneNo','gender','cost','cities','area','action'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  doctorList : Doctor[] = [];
  constructor(private _doctorService:DoctorService) {
    
  }
  ngOnInit(): void {
    this.getAllConfirmedDoctors();
  }

  getAllConfirmedDoctors(){

    this._doctorService.GetAllConfirmedDoctors().subscribe(doctors =>{
      console.log(doctors)
      this.dataSource = new MatTableDataSource(doctors);
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;
    })
  }

}
