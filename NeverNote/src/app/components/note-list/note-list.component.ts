import { Component ,Input,OnInit} from "@angular/core";
import { Router } from "@angular/router";
import { LoginService } from "src/app/services/login.service";
import { INote } from "../../models/Note";
import { NoteService } from "../../services/note.service";

@Component({
    selector:"note-list",
    templateUrl:"./note-list.component.html",
})
export class NoteListComponent implements OnInit{
    notes:INote[];
    errorMessage:string;
    user:string;
    constructor( 
        private _noteService :NoteService,
        private _loginService:LoginService,
        private _router:Router
        ){};

    ngOnInit(){
        this._noteService.getUserNotes(localStorage.getItem("currentUser")).subscribe(notes =>{
            this.notes = notes;
        },(error => this.errorMessage = <any>error))
    }
    getUserId(){
        console.log(this._loginService.getId());
    }
    deleteNote(id:any){
        this._noteService.deleteNote(id).subscribe(
            success=>{this._noteService.getUserNotes(localStorage.getItem("currentUser")).subscribe(notes =>{
                this.notes = notes;
            },(error => this.errorMessage = <any>error))},
            err=>{console.log("note delete error");}
        )
    }
    editNote(id:string){
        this._router.navigate(["/notes/",id]);
    }
    
}