import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Response } from '@angular/http';
import { AccountService } from '../services/AccountService';
import { Router } from '@angular/router';
import { NotesService } from '../services/notes.service';
import { debounce } from 'rxjs/operators';

import { HttpClient, HttpParams, HttpHeaders, HttpResponse } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  firstname: any;
  lastname: any;
  constructor(private service: AccountService, private router: Router, private notes: NotesService, private httpclient: HttpClient) { }



  Emailform = new FormControl('', [
    Validators.required,
    Validators.pattern("[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,15}")
  ])

  Passwordform = new FormControl('', [
    Validators.required
  ])

  ngOnInit() {


    var httpOptions2 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    var datas = {
      "Email": "prashantdeshmukh518@gmail.com",
      "Password": "123456789A"
    }

    this.httpclient.post("https://localhost:44387/api/Account/Login", datas, httpOptions2).subscribe(res => {
      console.log(res);
    }, err => {
      console.log("error", err)
    })  
  }
  showError: boolean = false;
  flag: any;
  userData: any;
  Email: any;
  OnSubmit() {
    



    this.service.LoginData(this.model).subscribe((data: any) => {
      
      console.log(data.status);
      console.log(data.user1);
    //  this.flag = data.status;
      //this.userData = data.user1;
      if (this.flag == 0) {
        this.showError = true;
        alert("Login failed")
      }
      else {
        alert("Login success");
        this.userData = data.user1;
        this.Email = this.userData.email;
        this.firstname = this.userData.firstName;
        this.lastname = this.userData.lastName;
        localStorage.setItem('Email', this.Email);
        localStorage.setItem('Firstname', this.firstname);
        localStorage.setItem('Lastname', this.lastname);
        this.router.navigate(['/fundoo']);
        //localStorage.setItem('Email', 'prashantdeshmukh518@gmail.com');
        //localStorage.setItem('Firstname', 'prashant');
        //localStorage.setItem('Lastname', 'deshmukh');
        //this.router.navigate(['/fundoo']);       
      }
    });
  }

}

