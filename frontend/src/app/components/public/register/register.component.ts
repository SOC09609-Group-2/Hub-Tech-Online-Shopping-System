import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {AuthenticationService} from '../../../services/login/authentication.service';
import {UserModel} from '../../../models/Auth/UserModel';
import {UploadFileService} from '../../../services/UploadFileService ';
import {AngularStripeService} from '@fireflysemantics/angular-stripe-service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit,  AfterViewInit, OnDestroy {
  @ViewChild('cardInfo', { static: false }) cardInfo: ElementRef;
  stripe;
  loading = false;
  confirmation;

  card: any;
  cardHandler = this.onChange.bind(this);
  error: string;

  agree: boolean;
  agreeCustomer: boolean;
  userValidation = new UserModel();
  validationError = [];
  isLoading = false;
  selectedFiles: FileList;
  fileNameArray = [];
  rawfileName;
  fileName;
  generateDateNow: string;
  uniqueSlug: string;
  isCustomer = true;
  constructor( private cd: ChangeDetectorRef, private stripeService: AngularStripeService,
               private auth: AuthenticationService, private uploadService: UploadFileService, private router: Router, private toastr: ToastrService) { }
  ngOnInit(): void {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['']);
    }
  }
  choiceRole(role) {
    if (role != 'customer') {
      this.isCustomer = false;
    } else {
      this.isCustomer = true;
    }
  }
   register(image, regForm: NgForm, tokenPayload: UserModel, role: string) {
    if (image.value) {
      this.uploadFiles();
      tokenPayload.slug = this.uniqueNumber();
      tokenPayload.created_at = this.generateDateTime();
      if (role == 'customer') {
        tokenPayload.status = 'active';
        tokenPayload.role = 'customer';
        tokenPayload.shop_name = '-------';
        tokenPayload.image_name = this.fileName;
        this.auth.register(tokenPayload).subscribe(
          status => {
            this.toastr.success('Register Success', 'Success');
            localStorage.setItem('userData', JSON.stringify(status.data));
            this.router.navigateByUrl('/');
          });
      } else {
        tokenPayload.gender = '--------';
        tokenPayload.dob = null;
        tokenPayload.status = 'active';
        tokenPayload.role = 'shopkeeper';
        tokenPayload.image_name = this.fileName;
        this.auth.register(tokenPayload).subscribe(
          status => {
            this.toastr.success('Register Success', 'Success');
            localStorage.setItem('userData', JSON.stringify(status.data));
            this.router.navigateByUrl('/');
          });
      }
    } else {
      this.toastr.error('Choose File', 'Error');
    }

  }

  onFileSeletected(event) {
    const indexNum = Number(event.target.files.length) - 1;
    this.selectedFiles = event.target.files;
    for (let i = 0; i < event.target.files.length; i++) {
      if (i < indexNum) {
        this.rawfileName +=  this.uniqueNumber() + String(event.target.files[i].name + ',');
      } else {
        this.rawfileName +=  this.uniqueNumber() + String(event.target.files[i].name);
      }
    }
    this.fileName = this.rawfileName.replace('undefined', '');
    console.log(this.fileName);
  }

  uploadFiles() {
    for (let i = 0; i < this.selectedFiles.length; i++) {
      this.upload(this.selectedFiles[i]);
    }
  }

  upload(file) {
    this.uploadService.upload(file).subscribe(event => {
      this.fileNameArray.push(event['fileName'][0]);
    });
  }
  pad2(n) {
    return n < 10 ? '0' + n : n;
  }
  uniqueNumber(): string {
    const date = new Date();
    // tslint:disable-next-line:max-line-length
    this.uniqueSlug = date.getFullYear().toString() + this.pad2(date.getMonth() + 1) +
      this.pad2( date.getDate()) + this.pad2( date.getHours() ) + this.pad2( date.getMinutes());
    return this.uniqueSlug;
  }
  generateDateTime(): string {
    const date = new Date();
    // tslint:disable-next-line:max-line-length
    this.generateDateNow = date.getFullYear().toString() + '-' + this.pad2(date.getMonth() + 1) +
      '-' + this.pad2( date.getDate()) + ' ' + this.pad2( date.getHours() ) + ':' + this.pad2( date.getMinutes() ) +
      ':' + this.pad2( date.getSeconds() );
    return this.generateDateNow;
  }

  isAgree(event) {
    this.agree = event.checked;
  }

  isAgreeCustomer(event) {
    this.agreeCustomer = event.checked;
  }

  ngAfterViewInit() {
    this.stripeService.setPublishableKey('pk_test_2syov9fTMRwOxYG97AAXbOgt008X6NL46o').then(
      stripe => {
        this.stripe = stripe;
        const elements = stripe.elements();
        this.card = elements.create('card');
        this.card.mount(this.cardInfo.nativeElement);
        this.card.addEventListener('change', this.cardHandler);
      });
  }

  ngOnDestroy() {
    this.card.removeEventListener('change', this.cardHandler);
    this.card.destroy();
  }

  onChange({ error }) {
    if (error) {
      this.error = error.message;
    } else {
      this.error = null;
    }
    this.cd.detectChanges();
  }

  async onSubmit(form: NgForm) {
    const { token, error } = await this.stripe.createToken(this.card);

    if (error) {
      console.log('Error:', error);
    } else {
      console.log('Success!', token);
    }
  }

}
