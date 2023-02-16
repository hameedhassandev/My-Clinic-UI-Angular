import { Book } from "./Book";
import { Cities } from "./Cities";

export interface Patient{
    id:string,
    fullName:string,
    image:string,
    address:string,
    cities:Cities,
    phoneNo:string,
    bookings:Book[]|null
    
    
}