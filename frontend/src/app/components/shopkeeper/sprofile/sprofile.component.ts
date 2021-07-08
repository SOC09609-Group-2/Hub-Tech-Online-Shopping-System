import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../../services/login/authentication.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {UserModel} from '../../../models/Auth/UserModel';
import {UploadFileService} from "../../../services/UploadFileService ";


@Component({
  selector: 'app-sprofile',
  templateUrl: './sprofile.component.html',
  styleUrls: ['./sprofile.component.scss']
})
export class SprofileComponent implements OnInit{
  selectedFiles: FileList;
  isSelectFile = false;
  fileNameArray = [];
  rawfileName;
  fileName;
  uniqueSlug: string;
  user = [];
  constructor(private authenticationService: AuthenticationService,  private uploadService: UploadFileService,
              private router: Router,  private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.authenticationService.getUsers().subscribe(userData => {
      this.user = Object.values(this.authenticationService.getUserData());
    });
  }
  onFileSeletected(event) {
    this.isSelectFile = true;
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
      this.pad2( date.getDate()) + this.pad2( date.getHours() ) + this.pad2( date.getMinutes() );
    return this.uniqueSlug;
  }

  updateProfile(user: UserModel) {
    if (this.isSelectFile == true) {
      user.image_name = String(this.fileName);
      this.uploadFiles();
    } else {
      user.image_name = user['old_pict'];
    }
    this.authenticationService.updateProfile(user.id, user.name, user.email, user.address, user.image_name).subscribe(Data => {
      this.authenticationService.retrieveByID(user.id).subscribe(userData => {
        localStorage.removeItem('userData');
        localStorage.setItem('userData', JSON.stringify(userData.data));
        this.toastrService.success('Update Success!', 'Success');
        this.router.navigateByUrl('/');
      });
    });

  }

}

