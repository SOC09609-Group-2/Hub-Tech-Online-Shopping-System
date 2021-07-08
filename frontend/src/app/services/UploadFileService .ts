import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import {URL_HOST} from '../utils/Setting';
@Injectable({
  providedIn: 'root'})
export class UploadFileService {
  constructor(private http: HttpClient) { }

  upload(file: File) {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post(URL_HOST + '/api/uploadFile', formData);
  }


}
