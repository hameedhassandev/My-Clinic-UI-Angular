import { Data } from "@angular/router"
import { Patient } from "./Patient"
import { Doctor } from "./Doctor"

export interface Book{
    id:number,
    time:Data,
    createdAt:Data,
    expiryDate:Data,
    isConfirmed:Boolean,
    doctorId:string,
    patient:Patient | null
    doctor :Doctor | null
}