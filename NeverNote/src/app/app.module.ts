import { HttpClientModule } from '@angular/common/http';
import { Component, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoteListComponent } from './components/note-list/note-list.component';
import { NoteService } from './services/note.service';
import { LoginComponent } from './components/login/login.component';
import { UserService } from './services/user.service';
import { RouterModule } from '@angular/router';
import { AuthGuardService } from './services/login-guard.service';
import { LoginService } from './services/login.service';
import { RegistrationComponent } from './components/registration/registration.component';
import { NoteNewComponent } from './components/note-new/note-new.component';
import { NoteComponent } from './components/note/note.component';
import { NoteEditComponent } from './components/note-edit/note-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    NoteListComponent,
    LoginComponent,
    RegistrationComponent,
    NoteNewComponent,
    NoteComponent,
    NoteEditComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path:"login",component:LoginComponent},
      {path:"notes",canActivate:[AuthGuardService], component:NoteComponent},
      {path:"",component:LoginComponent},
      {path:"registration",component:RegistrationComponent},
      {path:"note-new",canActivate:[AuthGuardService],component:NoteNewComponent},
      {path:"notes/:id",canActivate:[AuthGuardService],component:NoteEditComponent},
    ])
  ],
  providers: [
    NoteService,
    UserService,
    AuthGuardService,
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
