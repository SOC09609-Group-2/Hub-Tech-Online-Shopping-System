import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/public/register/register.component';
import { LoginComponent } from './components/public/login/login.component';
import {RouterModule, Routes} from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ClientComponent} from './components/public/client.component';
import {FaqComponent} from './components/public/faq/faq.component';
import {ContactComponent} from './components/public/contact/contact.component';
import {AboutUsComponent} from './components/public/about-us/about-us.component';
import {FormsModule} from '@angular/forms';
import { PasswordPatternDirective } from './directive/login/password-pattern.directive';
import {HttpClientModule} from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';
import {ShopkeeperComponent} from './components/shopkeeper/shopkeeper.component';
import {InsertProductComponent} from './components/shopkeeper/product-management/insert-product/insert-product.component';
import {ProductModalComponent} from './components/shopkeeper/product-management/product-modal/product-modal.component';
import {ViewProductsComponent} from './components/shopkeeper/product-management/view-products/view-products.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {EditProductComponent} from './components/shopkeeper/product-management/edit-product/edit-product.component';
import {ViewOrderComponent} from './components/shopkeeper/view-order/view-order.component';
import {ProductSaleReportComponent} from './components/shopkeeper/product-sale-report/product-sale-report.component';
import {HomeComponent} from './components/public/home/home.component';
import { PasswordPattern2Directive } from './directive/register/password-pattern2.directive';
import { MatchPasswordDirective } from './directive/register/match-password.directive';
import { ProductComponent } from './components/public/product/product.component';
import {CartProductComponent} from './components/public/cart-product/cart-product.component';
import {ProductDetailComponent} from './components/public/product-detail/product-detail.component';
import {SearchComponent} from './components/public/search/search.component';
import { CustomerComponent } from './components/customer/customer.component';
import { OrderStatusComponent } from './components/customer/order-status/order-status.component';
import { OrderHistoryComponent } from './components/customer/order-history/order-history.component';
import { OrderStatusViewComponent } from './components/shopkeeper/order-status-view/order-status-view.component';




const appRoutes: Routes = [
  {
    path: '',
    component: ClientComponent,
    children: [
      {path: '', component: HomeComponent},
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent },
      {path: 'faq', component: FaqComponent },
      {path: 'contact', component: ContactComponent },
      {path: 'addToCart', component: CartProductComponent },
      {path: 'product-detail/:slug', component: ProductDetailComponent },
      {path: 'aboutUs', component: AboutUsComponent},
      {path: 'search/:keyword', component: SearchComponent },
      {path: 'product', component: ProductComponent}
    ],
  },  {
    path: 'customer_dashboard',
    component: CustomerComponent,
    children: [
      {path: 'order_status', component: OrderStatusComponent},
      {path: 'order_history', component: OrderHistoryComponent}
    ],
  }, {
    path: 'shopkeeper_dashboard',
    component: ShopkeeperComponent,
    children: [
      {path: 'insert_product', component: InsertProductComponent },
      {path: 'view_order_status', component: OrderStatusViewComponent},
      {path: 'view_products', component: ViewProductsComponent },
      {path: 'view_order', component: ViewOrderComponent },
      {path: 'shopkeeper-report', component: ProductSaleReportComponent },
      {path: 'edit_product/:slug', component: EditProductComponent }
    ],
  },
  {path: '**', redirectTo: ''}
];

@NgModule({
  declarations: [
    AppComponent,
    ClientComponent,
    RegisterComponent,
    LoginComponent,
    FaqComponent,
    ContactComponent,
    AboutUsComponent,
    PasswordPatternDirective,
    ShopkeeperComponent,
    InsertProductComponent,
    ProductModalComponent,
    ViewProductsComponent,
    EditProductComponent,
    ViewOrderComponent,
    ProductSaleReportComponent,
    HomeComponent,
    PasswordPattern2Directive,
    MatchPasswordDirective,
    ProductComponent,
    CartProductComponent,
    ProductDetailComponent,
    SearchComponent,
    CustomerComponent,
    OrderStatusComponent,
    OrderHistoryComponent,
    OrderStatusViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    FormsModule,
    NgxPaginationModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      progressBar: true,
      progressAnimation: 'increasing'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
