import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from './components/user/home/home.component';
import { HeaderComponent } from './components/header-footer/header/header.component';
import { FooterComponent } from './components/header-footer/footer/footer.component';
import { DetailProductComponent } from './components/user/detail-product/detail-product.component';
import { OrderComponent } from './components/user/order/order.component';
import { OrderDetailComponent } from './components/user/order-detail/order-detail.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { 
  HttpClientModule, 
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { TokenInterceptor } from './interceptor/token.interceptor';
import { MatIconModule } from '@angular/material/icon';

import { RouterModule, Routes } from '@angular/router';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/user/app/app.component';
import { OrderHistoryComponent } from './components/user/order-history/order-history.component';
import { ChangePasswordComponent } from './components/user/change-password/change-password.component';
import { ProductsComponent } from './components/user/products/products.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { AboutUsComponent } from './components/user/about-us/about-us.component';
import { DatePipe } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IdentityComponent } from './components/user/identity/identity.component';
import { AdminEditComponent } from './components/admin/admin-edit-product/admin-edit-product.component';
import { AdminListProductsComponent } from './components/admin/admin-list-products/admin-list-products.component';
import { AdminOrderConfirmComponent } from './components/admin/admin-order-confirm/admin-order-confirm.component';
import { AdminListCategoriesComponent } from './components/admin/admin-list-categories/admin-list-categories.component';
import { AdminListUsersComponent } from './components/admin/admin-list-users/admin-list-users.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { AdminEditUserComponent } from './components/admin/admin-edit-user/admin-edit-user.component';
import { AdminListProvidersComponent } from './components/admin/admin-list-providers/admin-list-providers.component';
import { AdminEditProviderComponent } from './components/admin/admin-edit-provider/admin-edit-provider.component';
import { NextDirective } from './next.directive';
import { PrevDirective } from './prev.directive';
import { BestSellersComponent } from './components/user/best-sellers/best-sellers.component';
import { AdminPanelComponent } from './components/admin/admin-panel/admin-panel.component';
import { CarouselComponent } from './components/admin/carousel/carousel.component';
import { AnimatedCursorsComponent } from './components/admin/animated-cursors/animated-cursors.component';
import { AdminListCustomersComponent } from './components/admin/admin-list-customers/admin-list-customers.component';
import { AdminEditCustomerComponent } from './components/admin/admin-edit-customer/admin-edit-customer.component';
import { SalesAnalyticsComponent } from './components/admin/sales-analytics/sales-analytics.component';
import { AnimationLoadingPageComponent } from './components/admin/animation-loading-page/animation-loading-page.component';
// animation-loading-service
import { LoadingService } from 'src/app/service/loading.service';
import { NewArrivalsComponent } from 'src/app/components/user/new-arrivals/new-arrivals.component';



@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    DetailProductComponent,
    OrderComponent,
    OrderDetailComponent,
    LoginComponent,
    RegisterComponent,
    AppComponent,
    OrderHistoryComponent,
    ChangePasswordComponent,
    ProductsComponent,
    AboutUsComponent,
    IdentityComponent,
    AdminEditComponent,
    AdminListProductsComponent,
    AdminOrderConfirmComponent,
    AdminListCategoriesComponent,
    AdminListUsersComponent,
    AdminDashboardComponent,
    AdminEditUserComponent,
    AdminListProvidersComponent,
    AdminEditProviderComponent,
    NextDirective,
    PrevDirective,
    BestSellersComponent,
    AdminPanelComponent,
    CarouselComponent,
    AnimatedCursorsComponent,
    AdminListCustomersComponent,
    AdminEditCustomerComponent,
    SalesAnalyticsComponent,
    AnimationLoadingPageComponent,
    NewArrivalsComponent,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    FormsModule, 
    HttpClientModule,
    AppRoutingModule,
    CarouselModule.forRoot(),
    MatDialogModule, 
    BrowserAnimationsModule, 
    FormsModule,
    CarouselModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    // animation-loading-service
    LoadingService,
    DatePipe,
  ],
  bootstrap: [
    // AppModule
    // HomeComponent,
    // DetailProductComponent,
    // OrderComponent,
    // OrderConfirmComponent,
    // LoginComponent,
    // RegisterComponent
    AppComponent
  ]
})
export class AppModule { }
