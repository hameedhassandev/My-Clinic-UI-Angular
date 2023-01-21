
export class RegisterAsDoctorVM{
    
    public userName : string;
    public email : string;
    public fullName : string;
    public doctorTitle : string;
    public password : string;
    public gender : number;
    public phoneNo  : string;
    public cities: number;
    public areaId: number;
    public address :string;
    public cost : number;
    public waitingTime  : number;
    public image :string;
    public departmentId: number;
    public specialistsIds : number[];
    public hospitalsIds : number[];
    public insuranceIds : number[];
    constructor() {
        this.userName = "";
        this.email = "";
        this.fullName = "";
        this.doctorTitle = "";
        this.password = "";
        this.gender = 0;
        this.phoneNo = "";
        this.cities = 0;
        this.areaId = 0;
        this.address = "";
        this.cost = 0;
        this.waitingTime = 0;
        this.image = "";
        this.departmentId = 0;
        this.specialistsIds = [];
        this.hospitalsIds = [];
        this.insuranceIds = [];

    }
    
}
