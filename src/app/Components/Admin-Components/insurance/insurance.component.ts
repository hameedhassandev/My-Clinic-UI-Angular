import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Insurance } from 'src/app/Models/Insurance';
import { InsuranceService } from 'src/app/Services/insurance.service';
import { InsuranceFormComponent } from '../forms-components/insurance-form/insurance-form.component';

@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.css']
})
export class InsuranceComponent implements OnInit{
  displayedColumns: string[] = ['id', 'companyName','discount','action'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  insuranceList : Insurance[] = [];
  citiesList :any;
  errMassage:any;
  constructor(public _dialog: MatDialog ,private _insurabce: InsuranceService) {

  }
  ngOnInit(): void {
    this.getAllInsurances()
  }

  getAllInsurances(){

    this._insurabce.getAllInsurance().subscribe(insurance =>{
      this.dataSource = new MatTableDataSource(insurance);
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;
    })
  }

  openDialog() {
    this._dialog.open( InsuranceFormComponent, {
      width:'40%',
      height:'55%'
    }).afterClosed().subscribe(val => {
      if(val=='Add'){
        this.getAllInsurances();
      }
    })
  }
  editInsurance(row:any){
    this._dialog.open(InsuranceFormComponent,{
      width:'40%',
      height:'55%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val == 'Update'){
        this.getAllInsurances();
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
