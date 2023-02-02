
export class RegisterAsVisitorVM{
    
    public userName : string;
    public email : string;
    public fullName : string;
    public password : string;
    public gender : number;
    public phoneNo  : string;
    public cities: number;
    public areaId: number;
    public address :string;

  
    constructor() {
        this.userName = "";
        this.email = "";
        this.fullName = "";
        this.password = "";
        this.gender = 0;
        this.phoneNo = "";
        this.cities = 0;
        this.areaId = 0;
        this.address = "";
    }
    
}
