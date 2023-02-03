import { Area } from "../Models/Area";
import { Cities } from "../Models/Cities";
import { Department } from "../Models/Department";
import { Hospital } from "../Models/Hospital";
import { Insurance } from "../Models/Insurance";
import { Specialist } from "../Models/Specialist";
import { TimeOfWork } from "../Models/TimeOfWork";

export class DoctorVM {
    image:string;
    email:string;
    userName:string;
    fullName:string;
    phoneNo:string;
    gender:string;
    cost:number;
    cities:Cities['name'];
    department:Department['name'];
    area:Area['areaName'];
    timesOfWorks:TimeOfWork[];
    specialists:Specialist[];
    insurances:Insurance[];
    hospitals:Hospital[];
  
    constructor() {
        this.image = ''
        this.userName=''
        this.email=''
        this.fullName=''
        this.phoneNo=''
        this.gender = '';
        this.cost = 0;
        this.cities = '';
        this.area= '';
        this.department = '';
        this.timesOfWorks=[];
        this.specialists=[];
        this.insurances= [];
        this.hospitals = [];

    }
}