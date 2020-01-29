import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm  = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(private readonly authService: AuthService, private readonly router: Router,
              private readonly toastr: ToastrService) { }

  ngOnInit() {
  }


  login() {
    this.authService.tryLogin(this.loginForm.get('email').value, this.loginForm.get('password').value).subscribe(
      result => {
      },
      error => {
        this.toastr.error('Incorrecte inloggegevens');
      }
    );
  }




}
