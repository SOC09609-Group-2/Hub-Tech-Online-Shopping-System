import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {URL_HOST} from '../../utils/Setting';
import {McategoryModel} from '../../models/category/mcategory.model';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {ScategoryModel} from '../../models/category/scategory.model';

@Injectable({ providedIn: 'root' })

export class McategoryService {
  constructor(private http: HttpClient) {}

  retrieveMcats(): Observable<any> {
    return this.http.get(URL_HOST + '/api/main_category');
  }
  retrieve_single_mc(id): Observable<any> {
    return this.http.get(URL_HOST + '/api/main_category/retrieve_single_mc?id=' + id);
  }

  retrieve_single_sc(id): Observable<any> {
    return this.http.get(URL_HOST + '/api/sub_category/retrieve_single_sc?id=' + id);
  }
  createMainCat(name: string, slug: string, created_at: string) {
    const mCat: McategoryModel = {name, slug, created_at};
    return this.http
      .post(
        URL_HOST + '/api/main_category',
        mCat
      );
  }
  retrieveMcatsByID(): Observable<any> {
    return this.http.get(URL_HOST + '/api/main_category');
  }
  editMactView(id): Observable<any> {
    return this.http.get(URL_HOST + '/api/main_category/retrieve_single_mc?id=' + id);
  }
  updateMact(id: number, updated_at: string, name: string) {
    const mcatData: McategoryModel = {id, name, updated_at };
    return this.http.put(URL_HOST + '/api/main_category', mcatData);
  }
  deleteMcat(id): Observable<any> {
    return this.http.delete(URL_HOST + '/api/main_category?id=' + id );
  }
}
