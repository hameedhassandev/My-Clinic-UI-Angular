import { Area } from "./Area";
import { Cities } from "./Cities";
import { Department } from "./Department";
import { Hospital } from "./Hospital";
import { Specialist } from "./Specialist";


export interface Doctor{

    id:string,
    fullName:string,
    doctorTitle:string,
    phoneNo:string,
    avgRate:number,
    numberOfViews:number,
    waitingTime:number,
    cities: Cities,
    area:Area,
    address:string,
    department: Department,
    specialists: Specialist[]|null,
    hospitals: Hospital[]|null
}