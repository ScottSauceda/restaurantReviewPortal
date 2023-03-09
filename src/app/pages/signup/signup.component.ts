import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

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

  constructor(private _formBuilder: FormBuilder, private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  signUp(){
    console.log("Sign Up Button Clicked");
  }



}
