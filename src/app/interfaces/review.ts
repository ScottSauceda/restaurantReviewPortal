export interface Review {
    reviewId: number;
    rating: number;
    timeCreated?: Date;
    reviewText: String;
    userId: number;
    userName?: String;
    sessionUserMatch?: Boolean;
}
