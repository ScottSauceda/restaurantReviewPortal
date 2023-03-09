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

  // booleans
  profileLoaded: boolean = false;
  editing: boolean = false;

  // id's
  profileID!: string|null;

  // update inputs
  email!: string|null;
  phone!: string|null;
  firstName!: string|null;
  lastName!: string|null;


  // models
  profile!: Profile;
  editedProfile!: Profile;


  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) { 
    this.editedProfile = {
      usersId : 0,
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      userName: "",
      isActive: true,
    }
  }

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

  loadEditPage(){
    console.log("Load Edit Page Clicked");
    this.editing = true;
  }

  sendEdit(){
    console.log("Send Edit Button Clicked");

    if(this.email == null){
      this.editedProfile.email = this.profile.email;
    } else {
      this.editedProfile.email = this.email;
    }

    if(this.phone == null){
      this.editedProfile.phone = this.profile.email;      
    } else {
      this.editedProfile.phone = this.phone;
    }

    if(this.firstName == null){
      this.editedProfile.firstName = this.profile.firstName;      
    } else {
      this.editedProfile.firstName = this.firstName;
    }

    if(this.lastName == null){
      this.editedProfile.lastName = this.profile.lastName
    } else {
      this.editedProfile.lastName = this.lastName;
    }

    this.editedProfile.usersId = this.profile.usersId;
    this.editedProfile.userName = this.profile.userName;

    console.log("sending to update profile");
    console.log(this.editedProfile);
    
    this.userService.updateProfile(this.profile.usersId, this.editedProfile);

  }

  cancelEdit(){
    this.editing = false;
    console.log("Cancel Edit Button Clicked");
  }

  changeAccountStatus(){
    console.log("Change Account Status Button Clicked");
  }

}
