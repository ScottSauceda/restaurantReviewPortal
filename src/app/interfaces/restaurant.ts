import { Review } from "./review";

export interface Restaurant {
    restaurantId: number;
    location_id: number;
    owner_id: number;
    name: String;
    location_name: String;
    address: String;
    city: String;
    state: String;
    zip_code: number;
    owner_name: String;
    restaurantReviews: Review[];
}