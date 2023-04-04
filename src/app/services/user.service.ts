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
  createUser(newProfile: NewProfile){    const httpOptions = {
    headers: new HttpHeaders({ 
      'Accept': 'text/html',
    }), 
    responseType: 'text' as 'text',
  };

   return this.httpClient.post(environment.basePath + "/user/signup", newProfile, httpOptions)
    // .subscribe({
    //   next: (response) => {
    //     if(response){
    //       this.createSuccessful = true;
    //     }
    //     // this.router.navigate([""])
    //   },
    //   error: (error: HttpErrorResponse) => {
    //     console.log(error.message);
    //   }    
    // })
  }

  // Login
  login(user: Credential){

    console.log("user to be sent to login");
    console.log(user);

    return this.httpClient.post<User>(environment.basePath + "/auth/signin", user);
  }

  logout(){
    this.httpClient.post(environment.basePath + "/auth/signout", {observe: "response"})
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



  getUserProfile(userId: string) {
    return this.httpClient.get<Profile>(environment.basePath + "/user/" + userId);
  }
  
  updateProfile(userId: number , editedProfile: Profile){
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Accept': 'text/html',
      }), 
      responseType: 'text' as 'text',
    };

    return this.httpClient.put(environment.basePath + "/profile/update", editedProfile, httpOptions)
    // .subscribe({
    //   next: (response) => {
    //     if(response){
    //       console.log('response');
    //       console.log(response);
    //       this.updateSuccessful = true;
    //     }
    //     // window.location.reload;
    //   },
    //   error: (error: HttpErrorResponse) => {
    //     console.log("an error occured");
    //     console.log(error);
    //     console.log(error.message);
    //     console.log(error.error);
    //     // this.router.navigate(["../"]);
    //   }
    // })

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

    const httpOptions = {
      headers: new HttpHeaders({ 
        'Accept': 'text/html',
      }), 
      responseType: 'text' as 'text',
      // body: newImage
    };

    return this.httpClient.post(environment.basePath + "/image/user/create", newImage ,httpOptions)


    // .subscribe({
    //   next: (response) => {
    //     if(response){
    //       console.log(response);
    //     }
    //     // this.router.navigate(["/dashboard"])
    //   },
    //   error: (error: HttpErrorResponse) => {
    //     console.log("an error occured");
    //     console.log(error);
    //     console.log(error.message);
    //     console.log(error.error);
    //   }    
    // })
  }

  // this.httpClient.delete(environment.basePath + "/image/user/delete", httpOptions)

  deleteProfilePhoto(deleteImage: Image){
    console.log("id of image to be deleted");
    console.log(deleteImage);

    const httpOptions = {
      headers: new HttpHeaders({ 
        'Accept': 'text/html',
      }), 
      responseType: 'text' as 'text',
      body: deleteImage
    };

    return this.httpClient.delete(environment.basePath + "/image/user/delete", httpOptions)
    
  }
}