import { Component, OnInit } from '@angular/core';
import { GitService } from '../GitService';
import { Repository } from '../Repository';

@Component({
  selector: 'app-root',
  templateUrl: './app.repositories.html',
  styleUrls: ['../app.styles/app.component.css']
})
export class AppRepositories implements OnInit {
  repositories: Repository[] = [];
  bookmarks: Repository[] = JSON.parse(sessionStorage.getItem("Bookmarks"));//initiate array from sessionState
  first: boolean;
  wait: boolean = false;

  constructor(private gitService: GitService) {
  }

  ngOnInit() {
    this.first = true; // instruction page on
  }

  // search for repositories
  getResults(toSearch: string) {
    if (toSearch == '') // avoid search if 'toSearch' is empty
      return;

    this.first = false; // instruction page off
    this.wait = true; // spiner on


    this.repositories = []; // clean previous results

    this.gitService.getResults(toSearch).then((data => { // call search service
      this.wait = false;  // spiner off

      // initiate 'repositories' array, mostlly for bookmarks management
      for (var i = 0; i < data.items.length; i++) {
        let t: Repository = new Repository();
        t.id = data.items[i].id;
        t.name = data.items[i].name;
        t.avatar = data.items[i].owner.avatar_url;
        t.repository = data.items[i];
        this.repositories.push(t);
      }

      // light all bookmarked results based on 'bookmarks' array
      for (var i = 0; i < this.bookmarks.length; i++) {
        let b = this.bookmarks[i];
        let index = this.repositories.findIndex(element => element.id == b.id);
        if (index > -1)
          this.repositories[index].checked = b.checked;
      }
    }));

  }

  // bookmarks management
  BookMarkMe(index: number, id: number) {
    if (!this.bookmarks)
      this.bookmarks = []; //initiate if 'bookmarks' array is NULL
    if (!this.bookmarks.find(element => element.id == id)) {
      this.bookmarks.push(this.repositories[index]); // add to 'bookmarks' array
      this.repositories[index].checked = true; //light bookmark
    }
    else {
      this.bookmarks.splice(this.bookmarks.findIndex(element => element.id == id), 1); // remove from 'bookmarks' array
      this.repositories[index].checked = false; //unlight bookmark
    }
    sessionStorage.setItem("Bookmarks", JSON.stringify(this.bookmarks));
  }
}
