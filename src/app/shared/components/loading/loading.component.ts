import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html'
})
export class LoadingComponent implements OnInit {
  @Input() ratio: number = 3;

  constructor() { }

  ngOnInit(): void {
  }

}
