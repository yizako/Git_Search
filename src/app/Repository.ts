import { Component } from '@angular/core';

@Component({
})
export class Repository {
  id: number;
  name: string = "";
  avatar: string = "";
  repository: string = "";
  checked: boolean = false;

  constructor() {
    this.checked = false;
  }
 }
