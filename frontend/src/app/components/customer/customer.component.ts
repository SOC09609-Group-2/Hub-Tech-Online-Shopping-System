import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/login/authentication.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
declare var $: any;
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit, AfterViewInit {

  constructor(public auth: AuthenticationService, private router: Router, private toastrService: ToastrService) { }

  ngOnInit(): void {
    if (this.auth.isLoggedIn()) {
      if (this.auth.getRole() != 'customer') {
        this.router.navigate(['']);
      }
    } else {
      this.router.navigate(['']);
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
