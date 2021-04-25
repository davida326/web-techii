import { Injectable } from "@angular/core";
import { IUser } from "../models/User";

@Injectable()
export class LoginService{    
    currentUser:IUser;
    login(user:IUser) {
        this.currentUser = user;
        localStorage.setItem('currentUser',user._id);
    }
    logout() {
        localStorage.removeItem('currentUser');
    }
    getId(){
        return (localStorage.getItem("currentUser"));
    }
    
}