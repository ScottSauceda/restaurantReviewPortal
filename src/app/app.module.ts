import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { RestaurantsComponent } from './pages/browsing/restaurants/restaurants.component';
import { RestaurantReviewsComponent } from './pages/browsing/restaurant-reviews/restaurant-reviews.component';
import { UserProfileComponent } from './pages/dashboard/user-profile/user-profile.component';
import { UserReviewsComponent } from './pages/dashboard/user-reviews/user-reviews.component';
import { RestaurantCardComponent } from './components/cards/restaurant-card/restaurant-card.component';
import { DatePipe } from '@angular/common';
import { ReviewComponent } from './pages/dashboard/review/review.component';
import { ReviewCardComponent } from './components/cards/review-card/review-card.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
// import {MatStepperModule} from '@angular/material/stepper';
// import {MatInputModule} from '@angular/material/input';
// import {MatButtonModule} from '@angular/material/button';
// import {MatListModule} from '@angular/material/list';



@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    // FormsModule,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    RestaurantsComponent,
    RestaurantReviewsComponent,
    UserProfileComponent,
    UserReviewsComponent,
    RestaurantCardComponent,
    ReviewComponent,
    ReviewCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule
  ],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
