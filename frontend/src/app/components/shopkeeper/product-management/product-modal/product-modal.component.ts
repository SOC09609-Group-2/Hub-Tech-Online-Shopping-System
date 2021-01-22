import { Component, OnInit } from '@angular/core';
import {MDBModalRef} from 'angular-bootstrap-md';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.scss']
})
export class ProductModalComponent implements OnInit {
  heading: string;
  content: string;
  imageName: string;
  constructor(public modalRef: MDBModalRef) { }

  ngOnInit(): void {
  }
  getImages(images) {
    let imageArray;
    imageArray  = images.split(',');
    return imageArray;
  }
}
