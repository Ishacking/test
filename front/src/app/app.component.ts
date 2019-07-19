import { Component } from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import { AuthService } from './services/auth.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private authService : AuthService){}
  title = 'front';
  islogin = false;
  contact : any;
  result_login= "";
  contactChoice : any;
  contactChoiceClick = false;
  emailInput = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordInput = new FormControl('', [
    Validators.required,
    Validators.minLength(6)
  ]);
  loginForm = new FormGroup({
    email    : this.emailInput,
    password : this.passwordInput
  });
  onSubmit(){
    var user = this.loginForm.value;
    this.authService.login(user).subscribe(data => {  
      var da = JSON.parse(JSON.stringify({data}))
      var d = da.data;
      if(d.status=="success"){
        localStorage.removeItem('token')
        localStorage.setItem('token', d.token);
        this.islogin = true;
        this.result_login = "Login success";
        this.authService.contact("aaa").subscribe(data => {
          this.contact = JSON.parse(JSON.stringify({data})).data;

        })
      } else {
        this.result_login = d.status;
      }
      
    })
  }
  sContact(c){
    this.contactChoiceClick = true;
    this.contactChoice = c;
  }
  ngOnInit() {
    if(this.islogin == true){
      this.authService.contact("aaa").subscribe(data => {
        this.contact = JSON.parse(JSON.stringify({data})).data;
    })
    }
}
}
