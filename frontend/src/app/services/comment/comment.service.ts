import { Injectable } from '@angular/core';
import {SocketClientService} from '../../core/socket-client.service';
import {CommentModel} from '../../models/comment/comment.model';
import {first, map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {URL_HOST} from "../../utils/Setting";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private socketClient: SocketClientService, private http: HttpClient) { }


  save(name: string, image_name: string, pslug: string, text: string, created_at: string) {
    const commentData: CommentModel = {name, image_name, pslug, text, created_at};
    return this.socketClient.send('/topic/comments/create', commentData);
  }

  findAll(pslug: string): Observable<CommentModel[]> {
    return this.socketClient
      .onMessage(`/topic/comments/${pslug}/get`)
      .pipe(first(), map(comment => comment.map(CommentService.getUserListing)));
  }
  onPost(): Observable<CommentModel> {
    return this.socketClient.onMessage('/topic/comments/create').pipe(map(comment => CommentService.getUserListing(comment)));
  }

  static getUserListing(comment: any): CommentModel {
    return {...comment};
  }
  delete(id): Observable<any> {
    return this.http.delete(URL_HOST + '/api/comment/delete?id=' + id );
  }

}
