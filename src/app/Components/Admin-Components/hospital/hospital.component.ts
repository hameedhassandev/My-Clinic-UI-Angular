import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Hospital } from 'src/app/Models/Hospital';
import { HospitalServiceService } from 'src/app/Services/hospital-service.service';
import { FormHospitalComponent } from '../forms-components/form.hospital/form.hospital.component';
import { Cities } from 'src/app/Models/Cities';

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
  hospitalList : Hospital[] = [];
  citiesList :any;
  errMassage:any;
  constructor(public _dialog: MatDialog ,private _hospitalService: HospitalServiceService) {

  }
  ngOnInit(): void {
    this.getAllHospitals()
    this.getAlCities()
  }
  getAlCities(){
    this._hospitalService.getAllCities().subscribe(Cities=>{
      this.citiesList = Cities;

      const mapped = Object.entries(this.citiesList).map(([id, name]) => ({id, name}));
       this.citiesList = mapped;
      console.log(Cities);
      console.log(this.citiesList);
      console.log(mapped);

    })
  }
  getAllHospitals(){

    this._hospitalService.getAllHospitals().subscribe(hospitals =>{
      this.dataSource = new MatTableDataSource(hospitals);
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;
    })
  }

  openDialog() {
    this._dialog.open( FormHospitalComponent, {
      width:'40%',
      height:'55%'
    }).afterClosed().subscribe(val => {
      if(val=='Add'){
        this.getAllHospitals();
      }
    })
  }
  editHospital(row:any){
    this._dialog.open(FormHospitalComponent,{
      width:'40%',
      height:'55%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val == 'Update'){
        this.getAllHospitals();
      }
    })
  }
  deleteHospital(id:number){
    this._hospitalService.deleteDepartment(id).subscribe(hospitals =>{
      alert("Hospital Deleted");
      this._hospitalService.getAllHospitals().subscribe(hospitals =>{
        this.dataSource = new MatTableDataSource(hospitals);
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
