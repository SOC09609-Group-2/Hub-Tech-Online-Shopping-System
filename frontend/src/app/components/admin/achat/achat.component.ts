import { Component, OnInit } from '@angular/core';
import {ContactService} from "../../../services/contact/contact.service";
import {ToastrService} from "ngx-toastr";
import {AuthenticationService} from "../../../services/login/authentication.service";
import {BehaviorSubject, interval} from "rxjs";
import {GetUserModel} from "../../../models/contact/getUser.model";
import {ContactModel} from "../../../models/contact/contact.model";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-achat',
  templateUrl: './achat.component.html',
  styleUrls: ['./achat.component.scss']
})
export class AchatComponent implements OnInit {
  isLoading = false;
  userLists = [];
  clickUser;
  senderId;
  selectId;
  constructor(private contactService: ContactService,  public toastrService: ToastrService,
              private authenticationService: AuthenticationService) { }
  users$ = new BehaviorSubject<GetUserModel[]>([]);
  chats$ = new BehaviorSubject<ContactModel[]>([]);
  isSelectedUser = false;
  userImage = null;
  generateDateNow: string;
  contactValidation = new ContactModel();

  ngOnInit(): void {

    this.senderId = this.authenticationService.getId();
    if (this.senderId) {
      this.retrieveUserList();
      interval(1000).subscribe(() => {
        this.selectId = sessionStorage.getItem('clickId');
        this.retrieveChatData();
      });
    }
  }
  retrieveUserList(){
    this.isLoading = true;
    const senderId = this.authenticationService.getId();
    if (senderId) {
      this.contactService.senderList(senderId).subscribe(senList => {
        this.isLoading = true;
        Object.keys(senList).forEach(key => {
          this.userLists.push(senList[key]);
          this.isLoading = false;
        });
      });
      this.contactService.receiverList(senderId).subscribe(resList => {
        this.isLoading = true;
        Object.keys(resList).forEach(key => {
          this.userLists.push(resList[key]);
        });
        const uniqueNames = this.userLists.reduce((acc, current) => {
          const x = acc.find(item => item.id === current.id);
          if (!x) {
            return acc.concat([Object.assign({}, current)]);
          } else {
            return acc;
          }
        }, []);
        this.userLists = uniqueNames;
        this.isLoading = false;
      });
    }
  }

  retrieveChatData(){
    const receiverId =  localStorage.getItem('receiver_id');
    if (receiverId){
      this.userImage = localStorage.getItem('image_name');
      this.contactService.getChatData(this.authenticationService.getId(), Number(receiverId)).subscribe(chatData => {
        this.chats$.next(chatData.data);
      });
    }
  }

  selectUser(receiver_id, image_name){
    localStorage.setItem('receiver_id', receiver_id);
    localStorage.setItem('image_name', image_name);
    this.isSelectedUser = true;
  }

  sendAdmin(cform: NgForm, contactData: ContactModel){
    contactData.sender_id = this.authenticationService.getId();
    contactData.receiver_id = Number(localStorage.getItem('receiver_id'));
    if (contactData.text){
      this.contactService.save(contactData.sender_id, contactData.receiver_id, contactData.text, this.generateDateTime()).subscribe(status => {
        this.toastrService.success('Message Success', 'Success Message');
        cform.resetForm();

      });
    }else{
      this.toastrService.error('Need to type message', 'Error Message');
    }

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
