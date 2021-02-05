import { Injectable } from '@angular/core';
import {ValidatorFn, AbstractControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {URL_HOST} from '../../utils/Setting';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {UserModel} from '../../models/Auth/UserModel';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private userData: string;
  constructor(private http: HttpClient, private router: Router,  private toastrService: ToastrService) {}
  patternValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      const regex = new RegExp('.*');
      const valid = regex.test(control.value);
      return valid ? null : { invalidPassword: true };
    };
  }
  public getUsers(): Observable<any> {
    return this.http.get(URL_HOST + '/api/user');
  }

  patternValidator2(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$');
      const valid = regex.test(control.value);
      return valid ? null : { invalidPassword: true };
    };
  }
  public banUser(slug, action): Observable<any> {
    return this.http.get(URL_HOST + '/api/user/banUser?slug=' + slug + '&action=' + action);
  }
  MatchPassword(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (confirmPasswordControl.errors && !confirmPasswordControl.errors.passwordMismatch) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    };
  }

  login(userData): Observable<any> {
    return this.http.post(URL_HOST + '/api/user/login', userData);
  }
  public register(user: UserModel): Observable<any> {
    return this.http.post(URL_HOST + '/api/user', user);
  }

  public updateProfile(id: number, name: string, email: string, address: string, image: string): Observable<any> {
    return this.http.get(URL_HOST + '/api/user/updateProfile?id=' +
      id + '&name=' + name + '&email=' + email + '&address=' + address + '&image=' + image);
  }
  public retrieveByID(id: number): Observable<any> {
    return this.http.get(URL_HOST + '/api/user/retrieveByID?id=' + id );
  }

  public getUserData() {
      this.userData = localStorage.getItem('userData');
      return JSON.parse(this.userData);
  }
  public isLoggedIn(): boolean {
    const user = this.getUserData();
    if (user != null) {
      return true;
    } else {
      return false;
    }
  }
  getRole() {
    return this.getUserData().role;
  }
  getStatus() {
    return this.getUserData().status;
  }
  getName() {
    return this.getUserData().name;
  }
  getSlug() {
    return this.getUserData().slug;
  }
  getId() {
    return this.getUserData().id;
  }
  getImageName() {
    return this.getUserData().image_name;
  }
  modifyImageName() {
    return '/assets/images/' + this.getUserData().image_name;
  }

  public logout(): void {
    window.localStorage.removeItem('userData');
    this.toastrService.success('Logout Success!', 'Success');
    this.router.navigateByUrl('/');
  }
}
