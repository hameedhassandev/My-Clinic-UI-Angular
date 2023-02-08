import { Time } from "@angular/common";

export interface TimeOfWork{
    id:number;
    day:string;
    startWork:Time;
    endWork:Time;
    doctorId:string;
}