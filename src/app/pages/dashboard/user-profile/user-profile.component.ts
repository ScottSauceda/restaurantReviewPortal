import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Profile } from 'src/app/interfaces/profile';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  profileID!: string|null;
  profileLoaded: boolean = false;
  profile!: Profile;

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    console.log("ng on init calling getUserProfile");
    
    this.route.paramMap.subscribe(params => {

      console.log("params: " + params.get("userId"));
      console.log("here 1");

      this.profileID = params.get("userId");
      this.profileLoaded = false;

      console.log("here 2");
      console.log(this.profileID);

      if(this.profileID){
        console.log("here 3");

        console.log("calling user profile");
        this.userService.getUserProfile(this.profileID).subscribe((data: Profile) => {
          if(data){
            this.profileLoaded = true;
            this.profile = data;

            console.log("profile - data");
            console.log(this.profile);
          }
        })

      }
      

    })

  }

}
