import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Review } from 'src/app/interfaces/review';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

  // booleans
  editing: boolean = false;
  reviewLoaded: boolean = false;
  
  // id's
  reviewID!: string|null;

  // inputs
  rating!: number;
  reviewText!: string;

  // models
  review!: Review;
  editedReview: Review;

  constructor(private reviewService: ReviewService, private route: ActivatedRoute) { 
    this.editedReview = {
      reviewId: 0,
      userId: 0,
      rating: 0,
      reviewText: ""
    }
  }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.reviewID = params.get("reviewId");
      console.log(this.reviewID);

      if(this.reviewID){
        this.reviewService.getSelectedReview(this.reviewID).subscribe((data: Review) => {
          if(data){
            this.reviewLoaded = true;
            console.log("data");
            console.log(data);
            this.review = data;
          } else {
            console.log("No data loaded");
          }
        })
      }

    })
    
  }

  loadEditPage(){
    console.log("Load Edit Page Clicked");
    this.editing = true;
  }

  sendEdit(){
    console.log("Send Edit button clicked");
    if(this.reviewText == null){
      this.editedReview.reviewText = this.review.reviewText;
    } else {
      this.editedReview.reviewText = this.reviewText;
    }

    if(this.rating == null){
      this.editedReview.rating = this.review.rating;
    } else {
      this.editedReview.rating = this.rating;
    }

    console.log('sending to update review: ', this.editedReview);
    this.reviewService.updateReview(this.review.reviewId, this.editedReview);

  }

  cancelEdit(){
    this.editing = false;
    console.log("Cancel Edit Button Clicked");
  }

  deleteReview(){
    console.log("Delete review button clicked");
    this.reviewService.deleteReview(this.review);
  }

}
