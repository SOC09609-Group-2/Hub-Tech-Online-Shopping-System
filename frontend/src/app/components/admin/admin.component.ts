import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/login/authentication.service';
declare var $: any;
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, AfterViewInit  {

  constructor(public auth: AuthenticationService, private  router: Router) { }

  ngOnInit(): void {
    if (!this.auth.isLoggedIn()) {
      this.router.navigateByUrl('/');
    } else  if (this.auth.getRole() != 'admin') {
      this.router.navigateByUrl('/');
    }
  }
  ngAfterViewInit() {
    // tslint:disable-next-line:only-arrow-functions
    $('.hamburger .fas').click(function() {
      $('.wrapper').addClass('active');
    });

    // tslint:disable-next-line:only-arrow-functions
    $('.wrapper .sidebar .close').click(function() {
      $('.wrapper').removeClass('active');
    });
  }
}
