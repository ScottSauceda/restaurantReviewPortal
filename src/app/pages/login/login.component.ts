import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userID!: string|null;

  user!: User;

  loginForm: FormGroup;

  constructor(private router: Router, private userService: UserService) { 
    this.loginForm = new FormGroup({
      username: new FormControl(""),
      password: new FormControl("")
    })
  }

  ngOnInit(): void {
  }



  submitForm(){
    console.log(this.loginForm.value);
    
    this.userService.login(this.loginForm.value);

    console.log('login completed');
    this.userService.login(this.loginForm.value).subscribe((data: User) => {
          if(data){

            console.log("data returned");
            console.log(data);

            if(data.roleName !== "user"){
              console.log("role does not equal user, redirecting to signup ");
              window.location.replace("/signup");
            } else {
              this.user = data;
            
              console.log("this.user from login")
              console.log(this.user);
              sessionStorage.setItem("userLoginStatus", "true");
              sessionStorage.setItem('userId', this.user.usersId.toLocaleString());
              sessionStorage.setItem('username', this.user.userName);
  
              console.log('session: loginStatus');
              console.log(sessionStorage.getItem('userLoginStatus'));
  
              console.log('session: userId');
              console.log(sessionStorage.getItem('userId'));
              
              console.log('session: username');
              console.log(sessionStorage.getItem('username'));
  
              window.location.replace("/user/"+sessionStorage.getItem('userId'));
            }

          } else {
            alert("incorrect credentials");
            window.location.replace("/signup");
          }
    });
  }



  // userHomeRedirect(userId: string){
  //   // console.log("go to userHome", userId);
    
    
  //   localStorage.setItem('userId', userId);

  //   console.log('localStorage');
  //   console.log(localStorage.getItem('userId'));

  //   this.router.navigate([`/user/${userId}`])
  // }



}