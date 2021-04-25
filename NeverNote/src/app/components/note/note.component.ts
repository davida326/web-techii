import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {
  welcomeUser:string;
  constructor(
    private _userService :UserService,
    private _loginService:LoginService,
    private _router:Router
  ) { }

  ngOnInit(): void {
    this._userService.getUser(localStorage.getItem("currentUser")).subscribe(
      data=>{this.welcomeUser=data.name},
      err=>{console.log(err)}
    );
  }
  logout(){
    this._loginService.logout();
    this._router.navigate(["/login"]);
  }
}
