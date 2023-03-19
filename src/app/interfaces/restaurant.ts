import { Review } from "./review";
import { Image } from "./image";

export interface Restaurant {
    restaurantId: number;
    ownerId: number;
    name: String;
    address: String;
    city: String;
    state: String;
    zipCode: number;
    ownerName: String;
    restaurantReviews: Review[];
    restaurantImages: Image[];

}