import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Restaurant } from '../interfaces/restaurant';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(private httpClient: HttpClient) { }

  getAllRestaurants() {
    return this.httpClient.get<Restaurant[]>(environment.basePath + "/restaurant/restaurants");
  }

  getRestaurantById(restaurantId: string){
    return this.httpClient.get<Restaurant>(environment.basePath + "/restaurant/" + restaurantId);
  }

}