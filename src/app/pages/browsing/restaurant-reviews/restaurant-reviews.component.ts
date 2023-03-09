import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantReview } from 'src/app/interfaces/restaurant-review';
import { DatePipe } from '@angular/common';
import { NewReview } from 'src/app/interfaces/new-review';
import { Review } from 'src/app/interfaces/review';
import { Restaurant } from 'src/app/interfaces/restaurant';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-restaurant-reviews',
  templateUrl: './restaurant-reviews.component.html',
  styleUrls: ['./restaurant-reviews.component.scss']
})
export class RestaurantReviewsComponent implements OnInit {

  // booleans
  reviewsLoaded: boolean = false;
  adding: boolean = false;

  // id's
  restaurantID!: string|null;

  // inputs
  rating!: number;
  reviewText!: string;

  // models
  allReviews: Review[] = [];
  restaurant!: Restaurant;
  newReview!: NewReview;



  constructor(private reviewService: ReviewService, private restaurantService: RestaurantService, private route: ActivatedRoute, private router: Router, private datePipe: DatePipe) {  
      this.newReview = {
        userId : 0,
        rating: 0,
        reviewText: "Average dining experience. Food and service could be better!"
    }
  }

  ngOnInit(): void {
    
    console.log("ng on init calling getAllRestaurantReviews: ");
    this.route.paramMap.subscribe(params => {
      
      console.log("params: " + params.get("restaurantId"));
      console.log("here 1");

      this.restaurantID = params.get("restaurantId");
      this.reviewsLoaded = false;

      console.log("here 2");
      console.log(this.restaurantID);
      
      if(this.restaurantID){
        console.log("here 3");

        console.log("calling restaurant");
        this.restaurantService.getRestaurantById(this.restaurantID).subscribe((data: Restaurant) => {
          if(data){
            this.reviewsLoaded = true;
            this.restaurant = data;

            console.log("restaurant - data");
            console.log(this.restaurant);

            for(let i = 0; i < this.restaurant.restaurantReviews.length; i++){
              this.allReviews.push(this.restaurant.restaurantReviews[i]);
              console.log(this.restaurant.restaurantReviews[i].reviewText)
            }

            console.log("all reviews");
            console.log(this.allReviews);
          }
        })
      
      
      }
    })
  }

  sendReview(){
    console.log("Send Review Button Clicked");

    this.newReview.rating = this.rating;

    this.newReview.reviewText = this.reviewText;

    this.newReview.userId = 11;

    const dateString = this.datePipe.transform(Date.now(), 'YYYY-MM-dd hh:mm:ss');
    console.log(dateString);
    if(dateString){
      this.newReview.timeCreated = new Date(dateString);
    }

    console.log("sending to add review");
    console.log(this.newReview);

    this.reviewService.addReview(this.newReview);

  }
  

  addReview(){
    this.adding = true;
    console.log("Add Review Button Clicked");    
  }

  cancelReview(){
    this.adding = false;
    console.log("Cancel Review Button Clicked");
  }

  

}
