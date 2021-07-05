import { Component, OnInit } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {AuthenticationService} from '../../../services/login/authentication.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  p;
  users$ = new BehaviorSubject<any>([]);
  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.authenticationService.getUsers().subscribe(usersData => {
      this.users$.next(usersData.data);
    });
  }
  banUser(slug, action) {
    this.authenticationService.banUser(slug, action).subscribe(() => {
      this.getUsers();
    });
  }
}
