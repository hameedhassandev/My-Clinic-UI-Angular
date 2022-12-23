export class AuthUserVM{
    public massage : string;
    public email : string;
    public userName : string;
    public isAuth : boolean;
    public roles : string[];
    public token : string;
    public expiresOn : Date;
    public refreshTokenExpiration : Date;
    constructor(_massage:string, _email:string,_userName:string,_isAuth:boolean 
        ,_roles: Array<string>, _token:string,_expiresOn : Date,_refreshTokenExpiration : Date)
    {
        this.massage = _massage;
        this.email = _email;
        this.userName = _userName;
        this.isAuth = _isAuth;
        this.roles = _roles;
        this.token = _token;
        this.expiresOn = new Date(_expiresOn) ;
        this.refreshTokenExpiration = new Date(_refreshTokenExpiration) ;


    }


}