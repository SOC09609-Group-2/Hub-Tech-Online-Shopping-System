import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../../services/login/authentication.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {UserModel} from '../../../models/Auth/UserModel';

@Component({
  selector: 'app-cprofile',
  templateUrl: './cprofile.component.html',
  styleUrls: ['./cprofile.component.scss']
})
export class CprofileComponent implements OnInit {

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
