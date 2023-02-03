import { Gender } from "../ViewModels/Gender"
import { Area } from "./Area"
import { Cities } from "./Cities"

export interface Visitor{
    id:string,
    fullName:string,
    phoneNo:string,
    cities: Cities,
    area:Area,
    address: string,
    gender:Gender,
    image:string,
    createdAt:Date
}