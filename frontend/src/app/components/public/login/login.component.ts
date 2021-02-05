import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../../services/login/authentication.service';
import {Router} from '@angular/router';
import {UserModel} from '../../../models/Auth/UserModel';
import {ToastrService} from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  userValidation = new UserModel();
  ngOnInit(): void {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['']);
    }
  }
  constructor(public auth: AuthenticationService, private router: Router, private toastrService: ToastrService) {}


  login(userData: UserModel) {
    this.auth.login(userData).subscribe( status => {
          if (status.data != null) {
           if ( status.data.status != 'active') {
             this.toastrService.warning('Your account is locked!', 'Account Lock');
           } else {
             this.toastrService.success('Login Success', 'Success');
             localStorage.setItem('userData', JSON.stringify(status.data));
             this.router.navigateByUrl('/');
           }
          } else {
            this.toastrService.error('Email or Password wrong', 'Login Fail');
          }
    });
  }
}
