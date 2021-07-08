import { Injectable } from '@angular/core';
import {ContactModel} from '../../models/contact/contact.model';
import {URL_HOST} from "../../utils/Setting";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  save( sender_id: number, receiver_id: number, text: string, created_at: string ) {
    const contactModel: ContactModel = {sender_id, receiver_id, text: text, created_at};
    return this.http.post(URL_HOST + '/api/contact', contactModel);
  }
  getUserList(sender_id: number): Observable<any> {
    return this.http.get(URL_HOST + '/api/contact/getUserList?sender_id=' + sender_id);
  }

  senderList(uid: number){
    return this.http.get(URL_HOST + '/api/contact/getSenderList?uid=' + uid);
  }

  receiverList(uid: number) {
    return this.http.get(URL_HOST + '/api/contact/getReceiverList?uid=' + uid);
  }
  getChatData(sender_id: number, receiver_id: number): Observable<any> {
    return this.http.get(URL_HOST + '/api/contact?sender_id=' + sender_id + '&receiver_id=' + receiver_id);
  }
}
