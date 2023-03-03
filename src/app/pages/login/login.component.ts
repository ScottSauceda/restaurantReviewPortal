import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userID!: string|null;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  userHomeRedirect(userId: string){
    // console.log("go to userHome", userId);
    this.router.navigate([`/user/${userId}`])
  }

}
