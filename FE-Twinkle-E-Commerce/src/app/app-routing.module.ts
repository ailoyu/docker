import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/user/home/home.component';
import { DetailProductComponent } from './components/user/detail-product/detail-product.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { OrderComponent } from './components/user/order/order.component';
import { OrderDetailComponent } from './components/user/order-detail/order-detail.component';
import { OrderHistoryComponent } from './components/user/order-history/order-history.component';
import { ProductsComponent } from './components/user/products/products.component';
import { AboutUsComponent } from './components/user/about-us/about-us.component';
import { ChangePasswordComponent } from './components/user/change-password/change-password.component';
import { IdentityComponent } from './components/user/identity/identity.component';
import { AdminEditComponent } from './components/admin/admin-edit-product/admin-edit-product.component';
import { AdminAuthGuard } from './authorization/admin.authorization.service';
import { LoginAuthGuard } from './authorization/login.authorization.service';
import { AdminListProductsComponent } from './components/admin/admin-list-products/admin-list-products.component';
import { AdminOrderConfirmComponent } from './components/admin/admin-order-confirm/admin-order-confirm.component';
import { AdminListCategoriesComponent } from './components/admin/admin-list-categories/admin-list-categories.component';
import { AdminListUsersComponent } from './components/admin/admin-list-users/admin-list-users.component';
import { AdminEditUserComponent } from './components/admin/admin-edit-user/admin-edit-user.component';
import { AdminListProvidersComponent } from './components/admin/admin-list-providers/admin-list-providers.component';
import { AdminEditProviderComponent } from './components/admin/admin-edit-provider/admin-edit-provider.component';
import { BestSellersComponent } from './components/user/best-sellers/best-sellers.component';
import { AdminPanelComponent } from './components/admin/admin-panel/admin-panel.component';
import { AdminListCustomersComponent } from './components/admin/admin-list-customers/admin-list-customers.component';
import { AdminEditCustomerComponent } from './components/admin/admin-edit-customer/admin-edit-customer.component';
import { SalesAnalyticsComponent } from './components/admin/sales-analytics/sales-analytics.component';
import { NewArrivalsComponent } from './components/user/new-arrivals/new-arrivals.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'login', component: LoginComponent }, 
  { path: 'register', component: RegisterComponent }, 
  { path: 'order', component: OrderComponent }, 
  { path: 'new-arrivals', component:
  NewArrivalsComponent},
  { path: 'order-detail', component: OrderDetailComponent}, 
  { path: 'detail-product/:id', component: DetailProductComponent }, // Route cho DetailProductComponent
  { path: 'order-history', component: OrderHistoryComponent, canActivate:[LoginAuthGuard]},
  { path: 'about-us', component: AboutUsComponent},
  { path: 'best-sellers', component: BestSellersComponent},
  { path: 'info', component: IdentityComponent, canActivate:[LoginAuthGuard]},
  { path: 'change-password', component: ChangePasswordComponent, canActivate:[LoginAuthGuard]},
  { 
    path: 'admin', 
    canActivate: [AdminAuthGuard], 
    children: [
      { path: 'order-confirm/:status', component: AdminOrderConfirmComponent },
      
      { path: 'order-confirm/:status', component: AdminOrderConfirmComponent },
      
      { path: 'edit-products', component: AdminEditComponent },
      { path: 'edit-products/:id', component: AdminEditComponent },
      { path: 'list-products', component: AdminListProductsComponent },

      { path: 'edit-providers', component: AdminEditProviderComponent },
      { path: 'edit-providers/:id', component: AdminEditProviderComponent },
      { path: 'list-providers', component: AdminListProvidersComponent },


      { path: 'list-categories', component: AdminListCategoriesComponent},
      { path: 'panel', component: AdminPanelComponent},

      { path: 'list-users', component: AdminListUsersComponent },
      { path: 'edit-users', component: AdminEditUserComponent },

      { path: 'list-customers', component: AdminListCustomersComponent},
      { path: 'edit-customers/:id', component: AdminEditCustomerComponent },

      { path: 'sales-analytics', component: SalesAnalyticsComponent}
    ]
  },


  // { path: '**', component: HomeComponent },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
