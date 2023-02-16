import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Doctor } from 'src/app/Models/Doctor';
import { DoctorService } from 'src/app/Services/doctor.service';
import { ConfirmDoctorFormComponent } from '../../forms-components/confirm-doctor-form/confirm-doctor-form.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-confirmed-doctors',
  templateUrl: './confirmed-doctors.component.html',
  styleUrls: ['./confirmed-doctors.component.css']
})
export class ConfirmedDoctorsComponent implements OnInit {
  title:string = '';

  displayedColumns: string[] = ['image','email','fullName','phoneNo','gender','cost','cities','area','action'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  doctorList : Doctor[] = [];
  constructor(public _dialog: MatDialog ,private _doctorService:DoctorService
    , private _router:ActivatedRoute,private rourer :Router) {
    
  }
  ngOnInit(): void {
    this._router.paramMap.subscribe((params) => {
      const status = params.get('status');
      if(status === 'confirmed'){
        this.getAllConfirmedDoctors();
      }else if(status === 'notConfirmed')
      {
        this.changedToNotConfirmed();
      }

    });  
  }

  getAllConfirmedDoctors(){
    this.rourer.navigate(['/admin/confirmed-doctors/confirmed',]);
    this._doctorService.GetAllConfirmedDoctors().subscribe(doctors =>{
      console.log(doctors)
      this.title = 'Confirmed Doctors'
      this.dataSource = new MatTableDataSource(doctors);
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;
    })
  }


  changedToNotConfirmed(){
    this.rourer.navigate(['/admin/confirmed-doctors/notConfirmed',]);
    this._doctorService.GetAllNotConfirmedDoctors().subscribe(doctors =>{
      console.log(doctors)
      this.title = 'Not Confirmed Doctors'
      this.dataSource = new MatTableDataSource(doctors);
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;
    }) 
  }

  doctorDetails(id:any) {
    this._dialog.open(ConfirmDoctorFormComponent, {
      width:'60%',
      height:'90%',
      data:id
    }).afterClosed().subscribe(val => {
           
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
