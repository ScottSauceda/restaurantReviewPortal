import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { NewReview } from 'src/app/interfaces/new-review';
import { Review } from 'src/app/interfaces/review';
import { Image } from 'src/app/interfaces/image';
import { Restaurant } from 'src/app/interfaces/restaurant';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { ReviewService } from 'src/app/services/review.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-restaurant-reviews',
  templateUrl: './restaurant-reviews.component.html',
  styleUrls: ['./restaurant-reviews.component.scss']
})
export class RestaurantReviewsComponent implements OnInit {

  // booleans
  reviewsLoaded: boolean = false;
  adding: boolean = false;
  sessionActive: boolean = false;
  sessionId!: number;
  restaurantHasImages: boolean = false;

  editing: boolean = false;
  updateSuccessful: boolean = false;
  deleteSuccessful: boolean = false;

  // id's
  restaurantID!: string|null;

  // inputs
  // userId!: string;
  rating!: number;
  reviewText!: string;

  editReviewId!: number;
  editRating!: number;
  editReviewText!: string;
  editedReview!: Review;
  updateMessage!: string;
  deleteMessage!: string;

  // models
  allReviews: Review[] = [];
  allImages: Image[] = [];
  restaurant!: Restaurant;
  newReview!: NewReview;

  currentReview!: Review;



  constructor(private reviewService: ReviewService, private restaurantService: RestaurantService, private route: ActivatedRoute, private router: Router, private datePipe: DatePipe, config: NgbCarouselConfig) {  
    this.newReview = {
        userId : 0,
        rating: 0,
        reviewText: "Average dining experience. Food and service could be better!"
    }
    this.editedReview = {
      reviewId: 0,
      userId: 0,
      rating: 0,
      reviewText: ""
    }
    config.interval = 0;
    config.keyboard = true;
    config.pauseOnHover = true;
  }

  ngOnInit(): void {

    this.sessionId = Number(sessionStorage.getItem('userId'));
    console.log('this.sessioId');
    console.log(this.sessionId);
    
    console.log("ng on init calling getAllRestaurantReviews: ");
    this.route.paramMap.subscribe(params => {
      
      // console.log("params: " + params.get("restaurantId"));
      // console.log("here 1");

      this.restaurantID = params.get("restaurantId");
      this.reviewsLoaded = false;

      // console.log("here 2");
      // console.log(this.restaurantID);
      
      if(this.restaurantID){
        // console.log("here 3");

        console.log("calling restaurant");
        this.restaurantService.getRestaurantById(this.restaurantID).subscribe((data: Restaurant) => {
          if(data){
            this.reviewsLoaded = true;
            this.restaurant = data;

            console.log("restaurant - data");
            console.log(this.restaurant);

            for(let i = 0; i < this.restaurant.restaurantReviews.length; i++){
              this.allReviews.push(this.restaurant.restaurantReviews[i]);

              console.log("review userId")
              console.log(this.restaurant.restaurantReviews[i].userId.toString());

              if(this.sessionId == this.restaurant.restaurantReviews[i].userId){
                console.log("userId and sessionId match, display Edit and Delete button");
              } else {
                console.log("id's do not match, do not display edit and delete button");
              }
              
              // console.log(this.restaurant.restaurantReviews[i].reviewText)
            }

            // console.log("all reviews");
            // console.log(this.allReviews);

            if(this.restaurant.restaurantImages.length > 0){
              this.restaurantHasImages = true;
              for(let i = 0; i < this.restaurant.restaurantImages.length; i++){
                this.allImages.push(this.restaurant.restaurantImages[i]);
                console.log(this.restaurant.restaurantImages[i].imgName);
              }
            } else {
              this.restaurantHasImages = false;
            }

            // console.log("all images");
            // console.log(this.allImages);


            console.log("session storage userId");
            console.log(sessionStorage.getItem('userId'));

          }
        })
      
      
      }
    })

    if(sessionStorage.getItem('userLoginStatus') == 'true'){
      console.log("session is active");
      this.sessionActive = true;
      // const loggedInUserId = sessionStorage.getItem('userId');
      // this.userId = JSON.parse(sessionStorage.getItem('userId')!);
    } else {
      console.log("session is not active");
    }

  }

  sendAddReview(){
    console.log("Send Review Button Clicked");

    this.newReview.rating = this.rating;

    this.newReview.reviewText = this.reviewText;

    this.newReview.userId = JSON.parse(sessionStorage.getItem('userId')!);


    const dateString = this.datePipe.transform(Date.now(), 'YYYY-MM-dd hh:mm:ss');
    console.log(dateString);
    if(dateString){
      this.newReview.timeCreated = new Date(dateString);
    }

    console.log("sending to add review");
    console.log(this.newReview);

    this.reviewService.addReview(this.newReview, this.restaurant.restaurantId);

  }
  

  addReview(){
    this.adding = true;
    console.log("Add Review Button Clicked");    
  }

  cancelAddReview(){
    this.adding = false;
    console.log("Cancel Review Button Clicked");
  }



  loadEditPage(clickedReview: Review){
    console.log('Load Edit Page Clicked');
    this.editing = true;
    this.editReviewId = clickedReview.reviewId;
    console.log(clickedReview);
    console.log(this.editReviewId);

    this.currentReview = clickedReview;
  }

  sendEdit(){
    console.log("Send Edit button clicked");

    this.editedReview.reviewId = this.currentReview.reviewId;
    this.editedReview.userId = this.currentReview.userId;


    if(this.editReviewText == null){
      this.editedReview.reviewText = this.currentReview.reviewText;
      console.log('edit review input text was empty');
      console.log('using current review text');
    } else {
      this.editedReview.reviewText = this.editReviewText;
      console.log('edit review input text was given');
      console.log('sending new reviewText for edit');
    }

    this.editedReview.rating = this.editRating;


    console.log("this.editedReview");
    console.log(this.editedReview);

    this.reviewService.updateReview(this.currentReview.reviewId, this.editedReview)
    .subscribe(
      res => {
        this.updateSuccessful = true;
        console.log('HTTP response', res),
        this.updateMessage = res;
      },
      err => {
        console.log('HTTP Error', err.error),
        this.updateMessage = err.error;
      }, 
      () => console.log('HTTP request completed.')
    );
  }

  cancelEditReview(){
    this.editing = false;
    console.log("Cancel Review Button Clicked");
    this.editedReview.reviewId = 0;
    this.editedReview.userId = 0;
    this.editedReview.rating = 0;
    this.editedReview.reviewText = "";

  }

  deleteReview(clickedReview: Review){
    console.log("Delete Review Button Clicked");
    console.log(clickedReview);
    this.reviewService.deleteReview(clickedReview)
    .subscribe(
      res => {
        this.deleteSuccessful = true;
        console.log('HTTP response', res),
        this.deleteMessage = res;
      },
      err => {
        console.log('HTTP Error', err.error),
        this.deleteMessage = err.error;
      }, 
      () => console.log('HTTP request completed.')
    );



  }
  

}
