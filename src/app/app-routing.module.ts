import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantReviewsComponent } from './pages/browsing/restaurant-reviews/restaurant-reviews.component';
import { RestaurantsComponent } from './pages/browsing/restaurants/restaurants.component';
import { ReviewComponent } from './pages/dashboard/review/review.component';
import { UserProfileComponent } from './pages/dashboard/user-profile/user-profile.component';
import { UserReviewsComponent } from './pages/dashboard/user-reviews/user-reviews.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';

const routes: Routes = [
  // {
  //   path: "",
  //   component: HomeComponent
  // },
  {
    path: "signup",
    component: SignupComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "",
    children: [
      {
        path: "",
        pathMatch: "full",
        component: RestaurantsComponent
      },
      {
        path: ":restaurantId",
        component: RestaurantReviewsComponent
      }
    ]
  },
  {
    path: "user/:userId",
    children: [
      {
        path: "",
        pathMatch: "full",
        component: UserProfileComponent
      },
      {
        path: "userReviews",
        children: [
          {
            path: "",
            pathMatch: "full",
            component: UserReviewsComponent
          },
          {
            path: ":reviewId",
            component: ReviewComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
