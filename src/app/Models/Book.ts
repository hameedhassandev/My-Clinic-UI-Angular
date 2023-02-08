import { Data } from "@angular/router"

export interface Book{
    id:number,
    time:Data,
    createdAt:Data,
    expiryDate:Data,
    isConfirmed:Boolean,
    doctorId:string,
    patientId:string
}