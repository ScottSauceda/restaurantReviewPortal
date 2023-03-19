import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  sessionActive: boolean = false;

  constructor() { }

  userID!: string|null;

  ngOnInit(): void {

    console.log('session: loginStatus');
    console.log(sessionStorage.getItem('userLoginStatus'));

    console.log('session: userId');
    console.log(sessionStorage.getItem('userId'));
    
    console.log('session: username');
    console.log(sessionStorage.getItem('username'));
    

    if(sessionStorage.getItem('userLoginStatus') == 'true'){
      console.log("session is active");
      this.sessionActive = true;
      this.userID = sessionStorage.getItem('userId');
    } else {
      console.log("session is not active");
    }

  }

  logout(){
    console.log("logging out");
    sessionStorage.clear();
    window.location.replace("index.html");
  }

}
