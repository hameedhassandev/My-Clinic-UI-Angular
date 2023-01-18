import { Area } from "./Area";
import { Cities } from "./Cities";
import { Department } from "./Department";
import { Hospital } from "./Hospital";
import { Insurance } from "./Insurance";
import { Specialist } from "./Specialist";


export interface Doctor{

    id:string,
    fullName:string,
    doctorTitle:string,
    phoneNo:string,
    avgRate:number,
    waitingTime:number,
    cities: Cities,
    area:Area['areaName'],
    address:string,
    department: Department,
    specialists: Specialist[]|null,
    hospitals: Hospital[]|null,
    insurance:Insurance[]|null
    image:string
}
