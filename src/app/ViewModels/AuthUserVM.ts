export class AuthUserVM{
    public Id:string;
    public massage : string;
    public email : string;
    public userName : string;
    public isAuth : boolean;
    public roles : string[];
    public token : string;
    public expiresOn : Date;

    constructor(_id:string,_massage:string, _email:string,_userName:string,_isAuth:boolean 
        ,_roles: Array<string>, _token:string,_expiresOn : Date)
    {
        this.Id = _id;
        this.massage = _massage;
        this.email = _email;
        this.userName = _userName;
        this.isAuth = _isAuth;
        this.roles = _roles;
        this.token = _token;
        this.expiresOn = new Date(_expiresOn);

    }


}