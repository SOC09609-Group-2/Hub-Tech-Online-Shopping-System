import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/public/register/register.component';
import { LoginComponent } from './components/public/login/login.component';;
import {RouterModule, Routes} from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ClientComponent} from './components/public/client.component';
import {FaqComponent} from './components/public/faq/faq.component';
import {ContactComponent} from './components/public/contact/contact.component';
import {AboutUsComponent} from './components/public/about-us/about-us.component';
// import { AngularEditorModule } from '@kolkov/angular-editor';
// import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';


const appRoutes: Routes = [
  {
    path: '',
    component: ClientComponent,
    children: [
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent },
      {path: 'faq', component: FaqComponent },
      {path: 'contact', component: ContactComponent },
      {path: 'aboutUs', component: AboutUsComponent}
    ],
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ClientComponent,
    RegisterComponent,
    LoginComponent,
    FaqComponent,
    ContactComponent,
    AboutUsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
