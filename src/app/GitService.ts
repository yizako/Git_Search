import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class GitService {

  constructor(private http: HttpClient) { }
  public results;

  // search function
  getResults(toFind: string): Promise<any> {
    let url = 'https://api.github.com/search/repositories?q=' + toFind;
    return this.http.get(url).toPromise();
  }
}
