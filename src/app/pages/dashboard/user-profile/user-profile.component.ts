import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Profile } from 'src/app/interfaces/profile';
import { UserService } from 'src/app/services/user.service';
import { Image } from 'src/app/interfaces/image';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  // booleans
  profileLoaded: boolean = false;
  editing: boolean = false;
  addingPhoto: boolean = false;
  updateSuccessful: boolean = false;

  // id's
  profileID!: string|null;

  // update inputs
  email!: string|null;
  phone!: string|null;
  firstName!: string|null;
  lastName!: string|null;

  imgSrc!: string;
  imgName!: string;
  updateMessage!: string;

  // models
  profile!: Profile;
  editedProfile!: Profile;
  newImage!: Image; 
  deleteImage: Image;


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
    this.newImage = {
      imgName: "",
      imgSrc: "",
      imgType: "profile",
      usersId: 0
    }
    this.deleteImage = {
      imgId: 0,
      imgName: "",
      imgSrc: "",
      imgType: "profile",
      usersId: 0
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
        this.userService.getUserProfile(this.profileID)
        .subscribe((data: Profile) => {
          if(data){

            console.log("data returned for profile");
            console.log(data);

            this.profileLoaded = true;
            this.profile = data;

            console.log("profile - data");
            console.log(this.profile);


          } else {
            console.log("data could not be loaded. something went wrong");
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
      this.editedProfile.phone = this.profile.phone;      
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
    
    this.userService.updateProfile(this.profile.usersId, this.editedProfile)
    // .pipe(
    //   catchError((err, caught) => {
    //     return err.nessage;
    //   })
    // )
    .subscribe(
      res => {
        console.log('HTTP response', res),
        this.updateMessage = res;
      },
      err => {
        console.log('HTTP Error', err.error),
        this.updateMessage = err.error;
      }, 
      () => console.log('HTTP request completed.')
    );

    // .subscribe((data: any) => {
    //   if(data){

    //     console.log("data returned for update profile");
    //     console.log(data);

    //     this.updateMessage = data;


    //   } else {
    //     console.log("update profile data not returned");

    //   }
    // })



    this.updateSuccessful = true;

  }

  cancelEdit(){
    this.editing = false;
    console.log("Cancel Edit Button Clicked");
  }

  changeAccountStatus(){
    console.log("Change Account Status Button Clicked");

    this.editedProfile.usersId = this.profile.usersId;
    this.editedProfile.userName = this.profile.userName;
    this.editedProfile.firstName = this.profile.firstName;
    this.editedProfile.lastName = this.profile.lastName;
    this.editedProfile.email = this.profile.email;
    this.editedProfile.phone = this.profile.phone;

    if(this.profile.isActive == true){
      this.editedProfile.isActive = false;
    } else {
      this.editedProfile.isActive = true;
    }

    console.log("sending editedProfile");
    console.log(this.editedProfile);

    this.userService.updateActiveStatus(this.editedProfile);
  }


  addPhoto(){
    console.log("add photo button clicked");
    this.addingPhoto = true;
  }

  sendPhoto(){
    console.log("send photo button clicked");


    this.newImage.usersId = this.profile.usersId;

    if(this.imgName == null){
      this.newImage.imgName = "namewasnull";
    } else {
      this.newImage.imgName = this.imgName;
    }

    if(this.imgSrc == null){
      this.newImage.imgSrc = "sourcwasnull";
    } else {
      this.newImage.imgSrc = this.imgSrc;
    }


    console.log("image to be sent for addPhoto");
    console.log(this.newImage);

    this.userService.addProfilePhoto(this.newImage)
    .subscribe(
      res => {
        console.log('HTTP response', res),
        this.updateMessage = res;
      },
      err => {
        console.log('HTTP Error', err.error),
        this.updateMessage = err.error;
      }, 
      () => console.log('HTTP request completed.')
    );



    console.log("finished adding profile pic");

  }

  cancelAddPhoto(){
    this.addingPhoto = false;
    console.log("add photo button clicked");
  }


  deletePhoto(){
    console.log("delete photo button clicked");

    this.deleteImage.imgId = this.profile.profileImage!.imgId;
    this.deleteImage.imgName = this.profile.profileImage!.imgName;
    this.deleteImage.imgSrc = this.profile.profileImage!.imgSrc;
    this.deleteImage.imgType = this.profile.profileImage!.imgType;
    this.deleteImage.usersId = this.profile.profileImage!.usersId;

    this.userService.deleteProfilePhoto(this.deleteImage)
    .subscribe(
      res => {
        console.log('HTTP response', res),
        this.updateMessage = res;
      },
      err => {
        console.log('HTTP Error', err.error),
        this.updateMessage = err.error;
      }, 
      () => console.log('HTTP request completed.')
    );



    console.log("finished deleting profile pic");
  }
}
