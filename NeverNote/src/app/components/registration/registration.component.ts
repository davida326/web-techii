import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm = new FormGroup({
    name : new FormControl("",
    Validators.required
    ),
    userName : new FormControl("",[
    Validators.required,
    Validators.minLength(4)]
    ),
    email : new FormControl("",[
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password : new FormControl("",
    Validators.required)
  });
  constructor(
    private _router:Router,
    private _userService:UserService) {}

  ngOnInit(): void {
  }
  get name(){return this.registrationForm.get('name');}
  get userName(){return this.registrationForm.get('userName');}
  get email(){return this.registrationForm.get('email');}
  get password(){return this.registrationForm.get('password');}

  onFormSubmit(){ 
    if(!this.registrationForm.invalid){
      this._userService.registerUser(this.registrationForm.value).subscribe(
        data=>{
          this._router.navigate(["/login"]);
        },
        err=>{console.log("it should have worked")}
    )}
    else{
      this.name?.markAsTouched();
      this.userName?.markAsTouched();
      this.email?.markAsTouched();
      this.password?.markAsTouched();
    }
  }
}
