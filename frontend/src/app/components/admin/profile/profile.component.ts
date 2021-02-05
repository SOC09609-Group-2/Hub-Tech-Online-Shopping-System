import { Component, OnInit } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {FaqModel} from '../../../models/faq/faq.model';
import {UserModel} from '../../../models/Auth/UserModel';
import {AuthenticationService} from '../../../services/login/authentication.service';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user = [];
  constructor(private authenticationService: AuthenticationService, private router: Router,  private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.authenticationService.getUsers().subscribe(userData => {
      this.user = Object.values(this.authenticationService.getUserData());
    });
  }
updateProfile(user: UserModel) {
    console.log(user.image_name);
    this.authenticationService.updateProfile(user.id, user.name, user.email, user.address, user.image_name).subscribe(Data => {
      this.authenticationService.retrieveByID(user.id).subscribe(userData => {
        localStorage.removeItem('userData');
        localStorage.setItem('userData', JSON.stringify(userData.data));
        this.toastrService.success('Update Success!', 'Success');
        this.router.navigateByUrl('/');
      });
    });

}


}
