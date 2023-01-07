import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IHospital } from 'src/app/Models/IHospital';
import { HospitalServiceService } from 'src/app/Services/hospital-service.service';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.css']
})
export class HospitalComponent implements OnInit{
  displayedColumns: string[] = ['id', 'name','address','action'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  hospitalList : IHospital[] = [];
  errMassage:any;
  constructor(public dialog: MatDialog ,private _hospitalService: HospitalServiceService) {
    this._hospitalService.getAllHospitals().subscribe(
      data=>{
        this.hospitalList = data
      },
      error=>{
        this.errMassage = error;
       }
    )
  }
  ngOnInit(): void {
    this.getAllHospitals()
  }

  getAllHospitals(){

    this._hospitalService.getAllHospitals().subscribe(hospitals =>{
      this.dataSource = new MatTableDataSource(hospitals);
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;
    })
  }

  // openDialog() {
  //   this._dialog.open(, {
  //     width:'40%',
  //     height:'55%'
  //   }).afterClosed().subscribe(val => {
  //     if(val=='Add'){
  //       this.getAllHospitals();
  //     }
  //   })
  // }
  editHospital(row:any){

  }
  deleteHospital(id:number){
    
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
