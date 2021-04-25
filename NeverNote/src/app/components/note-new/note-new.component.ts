import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-note-new',
  templateUrl: './note-new.component.html',
  styleUrls: ['./note-new.component.css']
})
export class NoteNewComponent implements OnInit {
  date : Date = new Date();
  dateString:string;
  constructor(
    private _noteService:NoteService,
    private _router: Router
  ) { }

  noteForm = new FormGroup({
    title: new FormControl("",Validators.required),
    description: new FormControl("",Validators.required)
  });
  ngOnInit(): void {
    this.dateString = this.date.toLocaleString();
  }
  get title(){ return this.noteForm.get("title");}
  get description(){ return this.noteForm.get("description");}
  onFormSubmit(){
    if(!this.noteForm.invalid){
      let data = {
        "title":this.title?.value,
        "description":this.description?.value,
        "date":this.dateString,
        "ownerId":localStorage.getItem("currentUser")
      };
      this._noteService.createNote(data).subscribe(
        data=> {
          this._router.navigate(["/notes"]);
        },
        err=>{console.log("not good")});
    }
    else {console.log("invalid form");} 
  }
}
