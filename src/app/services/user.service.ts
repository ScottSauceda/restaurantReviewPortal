import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Profile } from '../interfaces/profile';
import { environment } from 'src/environments/environment';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  updateSuccessful:boolean = false;

  constructor(private httpClient: HttpClient, private router: Router) { }

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

}
