import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { INote } from 'src/app/models/Note';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-note-edit',
  templateUrl: './note-edit.component.html',
  styleUrls: ['./note-edit.component.css']
})
export class NoteEditComponent implements OnInit {
  noteEditForm = new FormGroup({
    title: new FormControl("",Validators.required),
    description: new FormControl("",Validators.required)
  });
  currentNoteId:any;
  currentNote:INote;
  constructor(
    private _routing: ActivatedRoute,
    private _noteService:NoteService,
    private _router:Router
  ) { }
    
  ngOnInit(): void {
    this.currentNoteId = this._routing.snapshot.paramMap.get('id');
    this._noteService.getNote(this.currentNoteId).subscribe(
      data=> {
        this.currentNote = data;
        this.noteEditForm.setValue({
          title:this.currentNote.title,
          description:this.currentNote.description
        });
      },
      err=> {console.log(err)}
    )
  }
  onFormSubmit(){
    
    this._noteService.updateNote(this.noteEditForm.value,this.currentNote._id,).subscribe(
      data=>{this._router.navigate(["/notes"])},
      err=>{console.log(err)}
    );
  }
}
