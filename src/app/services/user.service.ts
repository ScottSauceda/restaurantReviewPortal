import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Profile } from '../interfaces/profile';
import { environment } from 'src/environments/environment';
import { Router } from "@angular/router";
import { NewProfile } from '../interfaces/new-profile';
import { User } from '../interfaces/user';
import { Image } from '../interfaces/image';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  updateSuccessful:boolean = false;
  createSuccessful:boolean = false;
  deleteSuccessful:boolean = false;
  statusChanged:boolean = false;

  constructor(private httpClient: HttpClient, private router: Router) { }

  // Sign Up
  createUser(newProfile: NewProfile){
    this.httpClient.post<NewProfile>(environment.basePath + "/user/create", newProfile, {observe: "response"})
    .subscribe({
      next: (response) => {
        if(response){
          this.createSuccessful = true;
        }
        // this.router.navigate([""])
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      }    
    })
  }

  // Login
  login(user: Credential){

    console.log("user to be sent to login");
    console.log(user);

    return this.httpClient.post<User>(environment.basePath + "/user/login", user);
    // this.httpClient.post<Credential>(environment.basePath + "/user/login", user, {observe: "response"})
    // .subscribe({
    //   next: (response) => {
    //     if(response){
    //       console.log("Response was ok");
    //       console.log(response);
    //     }
    //   },
    //   error: (error: HttpErrorResponse) => {
    //     console.log(error.message);
    //   }     
    // })
  }


  getUserProfile(userId: string) {
    return this.httpClient.get<Profile>(environment.basePath + "/user/" + userId);
  }
  
  updateProfile(userId: number , editedProfile: Profile){
    // let headers = new HttpHeaders({
    //   // 'update': 'true'
    // })

    this.httpClient.put<Profile>(environment.basePath + "/profile/update/" + userId, editedProfile, {observe: "response"})
    .subscribe({
      next: (response) => {
        if(response){
          this.updateSuccessful = true;
        }
        window.location.reload;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
        // this.router.navigate(["../"]);
      }
    })

  }


  updateActiveStatus(editedProfile: Profile){

    console.log("updating active status");
    console.log(editedProfile);

    // let headers = new HttpHeaders({
    //   // 'update': 'true'
    // })

    this.httpClient.put<Profile>(environment.basePath + "/user/setActive", editedProfile, {observe: "response"})
    .subscribe({
      next: (response) => {
        if(response){
          this.statusChanged = true;
        }
        window.location.reload;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
        // this.router.navigate(["../"]);
      }
    })

  }

  addProfilePhoto(newImage: Image){
    console.log("image being sent");
    console.log(newImage);

    this.httpClient.post<NewProfile>(environment.basePath + "/image/user/create", newImage, {observe: "response"})
    .subscribe({
      next: (response) => {
        if(response){
          this.createSuccessful = true;
        }
        this.router.navigate(["/dashboard"])
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      }    
    })
  }


  deleteProfilePhoto(imageId: number){
    console.log("id of image to be deleted");
    console.log(imageId);

    this.httpClient.delete<NewProfile>(environment.basePath + "/image/user/delete/" + imageId, {observe: "response"})
    .subscribe({
      next: (response) => {
        if(response){
          this.deleteSuccessful = true;
        }
        this.router.navigate(["/dashboard"])
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      }    
    })


  }


}
