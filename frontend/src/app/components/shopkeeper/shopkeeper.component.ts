import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AuthenticationService} from '../../services/login/authentication.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
declare var $: any;
@Component({
  selector: 'app-shopkeeper',
  templateUrl: './shopkeeper.component.html',
  styleUrls: ['./shopkeeper.component.scss']
})
export class ShopkeeperComponent implements OnInit, AfterViewInit {
  constructor(public auth: AuthenticationService, private  router: Router, private toastrService: ToastrService) { }
  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      if (this.auth.getRole() != 'shopkeeper') {
        this.router.navigate(['']);
      }
    } else {
      this.router.navigate(['']);
    }
    if (this.auth.getStatus() != 'active') {
      this.router.navigate(['']);
      this.toastrService.error('Your account is already ban by admin', 'Error');
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
