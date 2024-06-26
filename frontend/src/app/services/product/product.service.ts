import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {URL_HOST} from '../../utils/Setting';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {ProductModel} from '../../models/product/product.model';
@Injectable({ providedIn: 'root' })

export class ProductService {
  constructor(private http: HttpClient) {}
  insertProduct(productData) {
    return this.http.post(URL_HOST + '/api/product', productData);
  }
  updateProduct(productData) {
    return this.http.put(URL_HOST + '/api/product', productData);
  }

  public fileUpload(fileDatas) {
    return this.http.post(URL_HOST + '/api/uploadFile', fileDatas);
  }

  viewPros() {
    return this.http.get(URL_HOST + '/api/product');
  }

  newArrival(): Observable<any> {
    return this.http.get(URL_HOST + '/api/product/newArrival');
  }

  bestSeller(): Observable<any> {
    return this.http.get(URL_HOST + '/api/product/bestSeller');
  }

  retrievePros(): Observable<any> {
    return this.http.get(URL_HOST + '/api/product');
  }
  retrieveStorePros(slug): Observable<any> {
    return this.http.get(URL_HOST + '/api/product/getBySlug?slug=' + slug);
  }
  editProductView(slug): Observable<any> {
    return this.http.get(URL_HOST + '/api/product/getBySlug?slug=' + slug);
  }
  deleteProduct(id): Observable<any> {
    return this.http.delete(URL_HOST + '/api/product/?id=' + id );
  }

  productDesc(): Observable<any> {
    return this.http.get(URL_HOST + '/api/product_desc');
  }

  searchProduct(keyword): Observable<any> {
    return this.http.get(URL_HOST + '/api/product/search?name=' + keyword);
  }
  filterPros(cid, scid): Observable<any> {
    return this.http.get(URL_HOST + '/api/product/fliter?cid=' + cid + '&scid=' + scid);
  }
}
