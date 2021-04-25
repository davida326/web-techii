import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/models/User';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  errorMessage:string;
  userForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  });
  users:IUser[];
  currentUser:IUser;
  constructor(
    private _userService :UserService,
    private _router:Router,
    private _login:LoginService
  ){}

  onFormSubmit(){
    this._userService.getUsers()
      .subscribe(users => {
        this.users=users;
        for (const user of this.users) {
          if(user.userName==this.userForm.get("username")?.value 
          && (user.password==this.userForm.get("password")?.value)){
            this.currentUser=user;
            this._login.login(user);
            this._router.navigate(["/notes"]);
          }
        };
      },
      error => this.errorMessage = <any>error);
  }
}
