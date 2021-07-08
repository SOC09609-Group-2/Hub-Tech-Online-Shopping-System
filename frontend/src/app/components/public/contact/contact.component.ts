import {Component, Input, OnInit, Output} from '@angular/core';

import {ContactModel} from '../../../models/contact/contact.model';
import {ContactService} from '../../../services/contact/contact.service';
import {AuthenticationService} from '../../../services/login/authentication.service';
import {ToastrService} from 'ngx-toastr';
import {NgForm} from '@angular/forms';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import { EventEmitter } from '@angular/core';
import {Router} from "@angular/router";
import {$} from 'protractor';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  generateDateNow: string;
  contactValidation = new ContactModel();
  constructor(private contactService: ContactService,
              public auth: AuthenticationService, public toastrService: ToastrService) {
  }
  ngOnInit(): void {

  }

  sendAdmin(cform: NgForm, contactData: ContactModel){
    contactData.sender_id = this.auth.getId();
    contactData.receiver_id = 1;
    this.contactService.save(contactData.sender_id, contactData.receiver_id, contactData.text, this.generateDateTime()).subscribe(status =>{
      this.toastrService.success('Message Success', 'Success Message');
      cform.resetForm();

    });
  }

  pad2(n) {
    return n < 10 ? '0' + n : n;
  }

  generateDateTime(): string {
    const date = new Date();
    // tslint:disable-next-line:max-line-length
    this.generateDateNow = date.getFullYear().toString() + '-' + this.pad2(date.getMonth() + 1) +
      '-' + this.pad2( date.getDate()) + ' ' + this.pad2( date.getHours() ) + ':' + this.pad2( date.getMinutes() ) +
      ':' + this.pad2( date.getSeconds() );
    return this.generateDateNow;
  }

}
