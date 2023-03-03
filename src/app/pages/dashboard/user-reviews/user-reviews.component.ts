import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Review } from 'src/app/interfaces/review';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-user-reviews',
  templateUrl: './user-reviews.component.html',
  styleUrls: ['./user-reviews.component.scss']
})
export class UserReviewsComponent implements OnInit {

  usersID!: string|null;
  allReviews: Review[] = [];
  reviewsLoaded: boolean = false;

  constructor(private reviewService: ReviewService, private route: ActivatedRoute ) { }

  ngOnInit(): void {

    console.log("ng on init calling getUserReviews: ");
    this.route.paramMap.subscribe(params => {

      console.log("params: " + params.get("userId"));
      console.log("here 1");

      this.usersID = params.get("userId");
      this.reviewsLoaded = false;

      console.log("here 2");
      console.log(this.usersID);

      if(this.usersID){
        console.log("here 3");

        console.log("calling reviews");
        this.reviewService.getReviewsByUser(this.usersID).subscribe((data: Review[]) => {
          if(data){
            this.reviewsLoaded = true;
            this.allReviews = [...data];

            console.log("all review");
            console.log(this.allReviews);
          }
        })

      }


    })

  }

}