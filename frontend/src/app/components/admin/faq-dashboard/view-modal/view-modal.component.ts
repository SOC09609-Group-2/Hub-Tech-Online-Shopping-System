import { Component, OnInit } from '@angular/core';
import {MDBModalRef} from 'angular-bootstrap-md';

@Component({
  selector: 'app-view-modal',
  templateUrl: './view-modal.component.html',
  styleUrls: ['./view-modal.component.scss']
})
export class ViewModalComponent implements OnInit {
  heading: string;
  content: any;
  constructor(public modalRef: MDBModalRef) { }

  ngOnInit(): void {
  }

}
