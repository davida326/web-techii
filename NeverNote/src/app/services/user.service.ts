import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { IUser } from "../models/User";

@Injectable()
export class UserService{
    private userUrl = "http://localhost:3000/users";
    headers = new HttpHeaders().set('Content-Type', 'application/json');

    constructor(private http:HttpClient){}
    getUsers():Observable<IUser[]>{
        return this.http.get<IUser[]>(this.userUrl,{headers:this.headers});
    };
    registerUser(data: any):Observable<any>{
        return this.http.post(this.userUrl,data);
    }
    getUser(id:any):Observable<IUser>{
        return this.http.get<IUser>(this.userUrl.concat("/"+id));
    }
}