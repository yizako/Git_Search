import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';  // replaces previous Http service
import { FormsModule } from '@angular/forms';
import { GitService } from './GitService';   // our custom service, see below
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component/app.component';
import { AppRepositories } from './app.repositories/app.repositories';
import { appBookmark } from './app.bookmark/app.bookmark';

const routes: Routes = [
  { path: "", component: AppRepositories },
  { path: 'Bookmark', component: appBookmark },
  { path: 'Repositories', component: AppRepositories },
  { path: '', redirectTo: '/Repositories', pathMatch: 'full' }
];


@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule, MDBBootstrapModule.forRoot(), RouterModule.forRoot(routes, { enableTracing: true })],
  declarations: [AppComponent, AppRepositories, appBookmark],
  providers: [GitService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
