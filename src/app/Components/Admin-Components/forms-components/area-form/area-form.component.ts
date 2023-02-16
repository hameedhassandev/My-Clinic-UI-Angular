import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AreaServiceService } from 'src/app/Services/area-service.service';
import { DropDownSelectService } from 'src/app/Services/drop-down-select.service';

@Component({
  selector: 'app-area-form',
  templateUrl: './area-form.component.html',
  styleUrls: ['./area-form.component.css']
})
export class AreaFormComponent implements OnInit{

  areaForm!: FormGroup 
  actionName : string ="Add";
  citiesList:any
  cityErro = false

  /**
   *
   */
  constructor(private _fb : FormBuilder, private _areaService: AreaServiceService, private _ddlService:DropDownSelectService
    ,private _dialog: MatDialogRef<AreaFormComponent>, @Inject(MAT_DIALOG_DATA) public editeData:any) {}
  
    ngOnInit(): void {
      this.getAllCities();
      console.log(this.citiesList)
      this.areaForm =  this._fb.group({
        areaName:['',Validators.required],
        city:['',Validators.required],
      })
      if(this.editeData){
        console.log(this.editeData);
        this.actionName="Update";
        this.areaForm.get('areaName')?.setValue(this.editeData.areaName);
        this.areaForm.get('city')?.setValue(this.editeData.city);
        console.log('city: '+this.editeData.city)
    }
    }
  
 getAllCities(){
      this._ddlService.getAllCities().subscribe(Cities=>{
        this.citiesList = Cities;
        const mapped = Object.entries(this.citiesList).map(([id, name]) => ({id, name}));
         this.citiesList = mapped;})
  }
  
    addArea(){
      var fData = new FormData();
      fData.append("areaName", this.areaForm.get('areaName')?.value);
      fData.append("city", this.areaForm.get('city')?.value);
      if(!this.editeData){
        if(this.areaForm.value){
          this._areaService.addArea(fData).subscribe({
            next:(res)=>{
              alert("Area Added Successfully.");
              this.areaForm.reset();
              this._dialog.close('Add');
            },
            error:(err)=>{
              alert('Somthing error while adding, try again!');
              console.log(err);
            }
          })
        }
      }
      else{
        fData.append("id",this.editeData.id)
        this.updateArea(fData);
      }
    }

    updateArea(formData:FormData){
      this._areaService.updateArea(formData).subscribe({
        next:(res)=>{
          alert("Area updated successfully");
          this.areaForm.reset();
          this._dialog.close('Update');
        },
        error:(err)=>{
          alert('Somthing error while updating, try again!');
          console.log(err);
        }
      })
    }
    validateCity(cityValue:any){
      console.log(cityValue);
       if(cityValue === ""){
          this.cityErro = true;
       }else{
        this.cityErro = false;
       }
    }
  }
  