import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthSerciceService } from 'src/app/Services/auth-service';
import { DoctorService } from 'src/app/Services/doctor.service';
import { UpdateProfileComponent } from '../update-profile/update-profile.component';

@Component({
  selector: 'app-doctor-home',
  templateUrl: './doctor-home.component.html',
  styleUrls: ['./doctor-home.component.css']
})
export class DoctorHomeComponent implements OnInit{
  doctorObj:any
  doctorId:string = '';
  imageValue :any
  imageName:any
  spOb:any
  updateErr = false
  isAdded = true
  updateMassage:any
  constructor(private _doctorService:DoctorService,public _dialog: MatDialog,
    private authService:AuthSerciceService) {
    
  }
  ngOnInit(): void {
    this.doctorId = this.authService.GetUser().Id
    this.getDoctoById(this.doctorId)

  }
  getDoctoById(docId:any){
    this._doctorService.GetDoctorById(docId).subscribe({
      next:(res)=>{
        this.doctorObj = res
        console.log(this.doctorObj)
        this.spOb = this.doctorObj.specialists
        console.log(this.spOb)
      },
      error:(err)=>{
        console.log(err)
      }
    })
    
}
onchange(event:any){
  let fileList: FileList = event.target.files;
  if(fileList.length > 0) {
      let file: File = fileList[0];

  this.imageValue = file;
  this.imageName = this.imageValue.name
  console.log(this.imageValue)
  }
}
updateImage(){
  var fData = new FormData()
  fData.append("userId",this.doctorId);
  fData.append("Image", this.imageValue, this.imageValue.name);
  this.authService.UpdateImagePicture(fData).subscribe(
    {
      next:(data) =>{
        console.log('Image Updated Successfully')
        this.getDoctoById(this.doctorId)
        this.isAdded = false
        this.updateErr = false
        
      },error:(err)=>{

        console.log(err.error);
        this.updateErr = true
        this.updateMassage = err.error
       // alert('error while update image, err: '+err.error)
      }
    }
  )

}
openFormDialog(doctorData:any) {
  this._dialog.open(UpdateProfileComponent , {
    width:'60%',
    height:'70%',
    data:doctorData
  }).afterClosed().subscribe(val => {
   this.getDoctoById(this.doctorId)
  })
}
}
