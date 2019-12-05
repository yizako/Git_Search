import { Component, OnInit } from '@angular/core';
import { Result } from 'range-parser';

@Component({
  selector: 'app-root',
  templateUrl: './app.bookmark.html',
  styleUrls: ['../app.styles/app.component.css']
})
export class appBookmark implements OnInit {
  repositories: Result[] = [];

  ngOnInit() {
    //initiate array from sessionState
    this.repositories = JSON.parse(sessionStorage.getItem("Bookmarks"));
  }


}
