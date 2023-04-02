import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NewProfile } from 'src/app/interfaces/new-profile';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  title = 'newMat';
  
  isLinear = true;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup; 

  newUser!: NewProfile;

  errorOccured: boolean = false;
  signupMessage!: string;

  // firstFormGroup = this._formBuilder.group({
  //   firstCtrl: ['', Validators.required],
  // });
  // secondFormGroup = this._formBuilder.group({
  //   secondCtrl: ['', Validators.required],
  // });
  // isLinear = false;


  constructor(private _formBuilder: FormBuilder, private userService: UserService, private httpClient: HttpClient) { 
    this.newUser = {
      username: "",
      password: "",
      role: ["user"],
      email: "",
      phone: "",
      firstName: "",
      lastName: ""
    }
  }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      username: ['', ],
      password: ['', ],
    });

    this.secondFormGroup = this._formBuilder.group({
      email: ['', ],
      phone: ['', ],
      firstName: ['', ],
      lastName: ['', ]
    });
  }

  submit(){
    console.log("Sign Up Button Clicked");

    // console.log(this.firstFormGroup.value.username);
    // console.log(this.secondFormGroup.value);
    // const User = {
    //   username: this.firstFormGroup.value.username,
    //   password: this.firstFormGroup.value.password,
    //   isActive: true,
    //   email: this.secondFormGroup.value.email,
    //   phone: this.secondFormGroup.value.phone,
    //   firstName: this.secondFormGroup.value.firstName,
    //   lastName: this.secondFormGroup.value.lastName,
    //   roleId: 3
    // }
    

    this.newUser.username = this.firstFormGroup.value.username;
    this.newUser.password = this.firstFormGroup.value.password;

    this.newUser.email = this.secondFormGroup.value.email;
    this.newUser.phone = this.secondFormGroup.value.phone;
    this.newUser.firstName = this.secondFormGroup.value.firstName;
    this.newUser.lastName = this.secondFormGroup.value.lastName;


    console.log("submitting new user to create user");
    console.log(this.newUser);


    this.userService.createUser(this.newUser)
    .subscribe(
      (data: any) => {
        console.log('HTTP response', data),
        this.signupMessage = data;
      },
      err => {
        console.log('HTTP Error', err.error),
        this.errorOccured = true;
        this.signupMessage = err.error;
      }, 
      () => console.log('HTTP request completed.')
    );

  }
}
