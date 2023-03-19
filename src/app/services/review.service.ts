import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { RestaurantReview } from '../interfaces/restaurant-review';
import { Review } from '../interfaces/review';
import { environment } from 'src/environments/environment';
import { NewReview } from '../interfaces/new-review';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  createSuccessful:boolean = false;
  editSuccessful: boolean = false;
  deleteSuccessful: boolean = false;

  constructor(private httpClient: HttpClient, private router: Router) {}

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

  addReview(newReview: NewReview, restaurantId: number){
    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*'      
    })

    this.httpClient.post<NewReview>(environment.basePath + "/review/create/" + restaurantId, newReview, {observe: "response", headers: headers})
    .subscribe({
      next: (response) => {
        if(response){
          this.createSuccessful = true;
          console.log("review created successfully");
        }
        // window.location.reload;
      },
      error: (error: HttpErrorResponse) => {
        console.log("error occured");
        console.log(error.message);
        this.router.navigate(["../"]);
      }
    })
  }

  getSelectedReview(reviewId: String){
    return this.httpClient.get<Review>(environment.basePath + "/review/" + reviewId);
  }

  updateReview(reviewId: number, editedReview: Review){
    return this.httpClient.put<Review>(environment.basePath + "/review/update/" + reviewId, editedReview, {observe: "response"})
    .subscribe({
      next: (response) => {
        if(response){
          this.editSuccessful = true;
        }
        window.location.reload;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
        this.router.navigate(["../"]);
      }
    })
  }

  deleteReview(reviewId: number){
    console.log("deleting review")
    return this.httpClient.delete(environment.basePath + "/review/delete/" + reviewId, {observe: "response"})
    .subscribe({
      next: (response) => {
        if(response){
          this.deleteSuccessful = true;
        }
        // window.location.reload;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
        this.router.navigate(["../"]);
      }
    })
  }


}
