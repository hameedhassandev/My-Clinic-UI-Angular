import { Gender } from "../ViewModels/Gender";
import { Area } from "./Area";
import { Cities } from "./Cities";
import { Department } from "./Department";
import { Hospital } from "./Hospital";
import { Insurance } from "./Insurance";
import { RateAndReviews } from "./RateAndReviews";
import { Specialist } from "./Specialist";


export interface Doctor{

    id:string,
    fullName:string,
    doctorTitle:string,
    phoneNo:string,
    avgRate:number,
    waitingTime:number,
    cities: Cities,
    cost :number,
    area:Area,
    address: string,
    gender:Gender,
    department: Department,
    emailConfirmed:Boolean,
    specialists: Specialist[]|null,
    hospitals: Hospital[]|null,
    insurance:Insurance[]|null
    image:string
    rateAndReview:RateAndReviews[]|null
    
}
