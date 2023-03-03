import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestaurantReview } from '../interfaces/restaurant-review';
import { Review } from '../interfaces/review';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private httpClient: HttpClient) {}

  // getAllRestaurantReviews(restaurantId: String){
  //   console.log("getting all restaurant reviews")
  //   return this.httpClient.get<RestaurantReview[]>(environment.basePath + "/restaurantReview/" + restaurantId);
  // }

  // getAllReviews(){
  //   console.log("getting all reviews")
  //   return this.httpClient.get<Review[]>(environment.basePath + "/review/reviews");
  // }

  getReviewsByUser(userId: string){
    return this.httpClient.get<Review[]>(environment.basePath + "/review/reviews/" + userId);
  }


}
