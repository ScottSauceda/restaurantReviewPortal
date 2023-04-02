import { Component, Input, OnInit } from '@angular/core';
import { Review } from 'src/app/interfaces/review';

@Component({
  selector: 'app-review-card',
  templateUrl: './review-card.component.html',
  styleUrls: ['./review-card.component.scss']
})
export class ReviewCardComponent implements OnInit {

  dates!: any[];

  @Input()
  reviewData!: Review

  constructor() { }

  ngOnInit(): void {
  }

}
