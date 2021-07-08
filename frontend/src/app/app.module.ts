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
import {SprofileComponent} from './components/shopkeeper/sprofile/sprofile.component';
import { AdminComponent } from './components/admin/admin.component';
import { InsertFaqComponent } from './components/admin/faq-dashboard/insert-faq/insert-faq.component';
import {ViewFaqComponent} from './components/admin/faq-dashboard/view-faq/view-faq.component';
import {EditFaqComponent} from './components/admin/faq-dashboard/edit-faq/edit-faq.component';
import {MainCategoryComponent} from './components/admin/category-dashboard/main-category/main-category.component';
import {SubCategoryComponent} from './components/admin/category-dashboard/sub-category/sub-category.component';
import {UserManagementComponent} from './components/admin/user-management/user-management.component';
import {RevenueComponent} from './components/admin/revenue/revenue.component';
import { ProfileComponent } from './components/admin/profile/profile.component';
import { CprofileComponent } from './components/customer/cprofile/cprofile.component';
import { SchatComponent } from './components/shopkeeper/schat/schat.component';
import { AchatComponent } from './components/admin/achat/achat.component';
import { CchatComponent } from './components/customer/cchat/cchat.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';





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
      {path: 'product', component: ProductComponent},
      {path: 'payment', component: SprofileComponent}
    ],
  },   {
    path: 'admin_dashboard',
    component: AdminComponent,
    children: [
      {path: 'profile', component: ProfileComponent },
      {path: 'insert_faq', component: InsertFaqComponent },
      {path: 'view_faq', component: ViewFaqComponent },
      {path: 'edit_faq/:slug', component: EditFaqComponent },
      {path: ':id/sub_category', component: SubCategoryComponent },
      {path: 'user-management', component: UserManagementComponent},
      {path: 'main_category', component: MainCategoryComponent },
      {path: 'view_revenue', component: RevenueComponent },
      {path: 'achat', component: AchatComponent }
    ],
  }, {
    path: 'customer_dashboard',
    component: CustomerComponent,
    children: [
      {path: 'profile', component: CprofileComponent },
      {path: 'order_status', component: OrderStatusComponent},
      {path: 'order_history', component: OrderHistoryComponent},
      {path: 'cchat', component: CchatComponent }
    ],
  }, {
    path: 'shopkeeper_dashboard',
    component: ShopkeeperComponent,
    children: [
      {path: 'profile', component: SprofileComponent },
      {path: 'insert_product', component: InsertProductComponent },
      {path: 'view_order_status', component: OrderStatusViewComponent},
      {path: 'view_products', component: ViewProductsComponent },
      {path: 'view_order', component: ViewOrderComponent },
      {path: 'shopkeeper-report', component: ProductSaleReportComponent },
      {path: 'edit_product/:slug', component: EditProductComponent },
      {path: 'schat', component: SchatComponent }
    ],
  },
  // {path: '**', redirectTo: ''}
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
    OrderStatusViewComponent,
    SprofileComponent,
    AdminComponent,
    InsertFaqComponent,
    ViewFaqComponent,
    EditFaqComponent,
    MainCategoryComponent,
    SubCategoryComponent,
    UserManagementComponent,
    RevenueComponent,
    ProfileComponent,
    CprofileComponent,
    SchatComponent,
    AchatComponent,
    CchatComponent
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
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
     }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
