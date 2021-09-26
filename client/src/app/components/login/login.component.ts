import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }
  // constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }


  loginGoogle(): void {
    // this.authService.login(new firebase.default.auth.GoogleAuthProvider());
  }

  loginFacebook(): void {
    // this.authService.login(new firebase.default.auth.FacebookAuthProvider());
  }

  loginEmail(): void {
    // this.authService.login(new firebase.default.auth.EmailAuthProvider());
  }

}
