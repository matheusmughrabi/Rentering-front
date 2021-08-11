import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html'
})
export class ProfilePageComponent implements OnInit {
  public selectedPage: number = 1;

  constructor() { }

  ngOnInit(): void {
  }

  selectPage(page: number): void{
    this.selectedPage = page;
  }
}
