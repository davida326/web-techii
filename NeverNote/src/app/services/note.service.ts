import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { INote } from "../models/Note";
import { Observable } from "rxjs";

@Injectable()
export class NoteService{
    private noteUrl = "http://localhost:3000/notes";
    headers = new HttpHeaders().set('Content-Type', 'application/json');

    constructor(private http:HttpClient){}

    getNotes():Observable <INote[]>{
        return this.http.get<INote[]>(this.noteUrl,{headers:this.headers});
    };
    
    getNote(id:string):Observable<INote>{
        return this.http.get<INote>(this.noteUrl.concat("/"+id));
    };

    getUserNotes(userId:any):Observable <INote[]>{
        return this.http.get<INote[]>("http://localhost:3000/users/notes/".concat(userId),{headers:this.headers});
    };
    
    createNote(newNote:any):Observable<any>{
        return this.http.post(this.noteUrl,newNote);
    }
    
    deleteNote(noteId:string){
        return this.http.delete(this.noteUrl.concat("/"+noteId));
    }

    updateNote(note:any,noteId:string){
        return this.http.patch(this.noteUrl.concat("/"+noteId),note);
    }
    
}

