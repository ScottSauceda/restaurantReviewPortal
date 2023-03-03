export interface Review {
    reviewId: number;
    rating: number;
    timeCreated: Date;
    reviewText: String;
    userId: number; 
}


// @Id
// @GeneratedValue(strategy = GenerationType.IDENTITY)
// @Column(name = "review_id", nullable = false)
// private Integer reviewId;

// @Convert(disableConversion = true)
// @Column(name = "time_created")
// private LocalDateTime timeCreated;

// @Column(name = "rating")
// private Integer rating;

// @Column(name = "review_text", length = 250)
// private String reviewText;

// @Column(name = "users_id")
// private Integer userId;
