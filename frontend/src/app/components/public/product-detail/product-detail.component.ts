import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ProductService} from '../../../services/product/product.service';
import {AtcService} from '../../../services/product/atc.service';
import {ToastrService} from 'ngx-toastr';
import {AuthenticationService} from '../../../services/login/authentication.service';
import {CommentModel} from "../../../models/comment/comment.model";
import {Subject} from "rxjs";
import {CommentService} from "../../../services/comment/comment.service";
import {takeUntil} from "rxjs/operators";
import {ContactModel} from "../../../models/contact/contact.model";
import {NgForm} from "@angular/forms";
import {ContactService} from "../../../services/contact/contact.service";


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  senderId;
  generateDateNow: string;
  product$ = [];
  commentValidation = new CommentModel();
  slug: string;
  @Input()
  comments: CommentModel[];
  private unsubscribeSubject: Subject<void> = new Subject<void>();
  constructor(private route: ActivatedRoute, private router: Router, private toastrService: ToastrService,
              private atcService: AtcService, private  productService: ProductService, private commentService: CommentService,
              private auth: AuthenticationService, private contactService: ContactService) { }

  ngOnInit(): void {
    if (this.auth.isLoggedIn()) {
      this.senderId = this.auth.getId();
    }
    this.route.params.subscribe(
      (params: Params) => {
        this.slug = params.slug;
        this.retrieveSingleProduct(this.slug);
      }
    );


    this.commentService
      .findAll(this.slug)
      .pipe(takeUntil(this.unsubscribeSubject))
      .subscribe(comments => this.comments = comments);

    this.commentService
      .onPost()
      .pipe(takeUntil(this.unsubscribeSubject))
      .subscribe(comments => {
        this.comments.push(comments);
        console.log('----------------');
        if (comments.text === undefined) {
          console.log('Create');
        }
        console.log('----------------');
      });

  }
  retrieveSingleProduct(slug) {
    this.productService.retrieveStorePros(slug).subscribe(prosData => {
      if (prosData.status != 404) {
        this.product$.push(prosData.data[0]);
      } else {
        this.router.navigate(['']);
      }
    });
  }
  saveProducts(slug) {
    this.atcService.saveProducts(slug);
  }

  getImages(images) {
    let imageArray;
    imageArray  = images.split(',');
    return imageArray;
  }
  createComment(commentForm, commentData: CommentModel) {
    if (this.auth.isLoggedIn()) {
    commentData.name = this.auth.getName();
    commentData.image_name = this.auth.getImageName();
    commentData.pslug = this.slug;
    commentData.created_at = this.generateDateTime();
    this.commentService.save(commentData.name, commentData.image_name, commentData.pslug, commentData.text, commentData.created_at);
    commentForm.resetForm();
    }else {
      this.toastrService.error('Need to login ', 'Error Message');
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
  sendAdmin(cform: NgForm, contactData: ContactModel, supplier_id: number){
    if (contactData.text){
      contactData.sender_id = this.auth.getId();
      contactData.receiver_id = supplier_id;
      this.contactService.save(contactData.sender_id, contactData.receiver_id, contactData.text, this.generateDateTime()).subscribe(status =>{
        this.toastrService.success('Message Success', 'Success Message');
        cform.resetForm();
      });
    }else{
      this.toastrService.error('Need to type Message', 'Error Message');
    }
  }



}
