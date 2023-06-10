import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './User/login/login.component';
import { RegisterComponent } from './User/register/register.component';
import { ShowProductsComponent } from './Products/show-products/show-products.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ResetPasswordComponent } from './User/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './User/forgot-password/forgot-password.component';
import { ShowUsersComponent } from './User/show-users/show-users.component'
import { EditUserComponent } from './User/edit-user/edit-user.component';
import { NavComponent } from './Navbar/nav/nav.component';
import { TokenInterceptor } from './token.interceptor';
import { CreateProductComponent } from './Products/create-product/create-product.component';
import { EditProductComponent } from './Products/edit-product/edit-product.component';
import { ControlProductComponent } from './Products/control-product/control-product.component';
import { ControlBlogComponent } from './Blog/control-blog/control-blog.component';
import { ShowBlogsComponent } from './Blog/show-blogs/show-blogs.component';
import { EditBlogComponent } from './Blog/edit-blog/edit-blog.component';
import { CreateBlogComponent } from './Blog/create-blog/create-blog.component';
import { GetBlogComponent } from './Blog/get-blog/get-blog.component';
import { RatingModule } from 'ng-starrating';
import { ProductComponent } from './Products/product/product.component';
import { ShowCartComponent } from './Cart/show-cart/show-cart.component';
import { ProcessComponent } from './Cart/process/process.component';
import { CashComponent } from './Cart/cash/cash.component';
import { PaypalBtnComponent } from './Components/paypal-btn/paypal-btn.component';
import { GlobalErrorInterceptor } from './global-error.interceptor';
import { ShowCategoryComponent } from './Pcategory/show-category/show-category.component';
import { EditCategoryComponent } from './Pcategory/edit-category/edit-category.component';
import { AddCategoryComponent } from './Pcategory/add-category/add-category.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ShowProductsComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
    ShowUsersComponent,
    EditUserComponent,
    NavComponent,
    CreateProductComponent,
    EditProductComponent,
    ControlProductComponent,
    ControlBlogComponent,
    ShowBlogsComponent,
    EditBlogComponent,
    CreateBlogComponent,
    GetBlogComponent,
    ProductComponent,
    ShowCartComponent,
    ProcessComponent,
    CashComponent,
    PaypalBtnComponent,
    ShowCategoryComponent,
    EditCategoryComponent,
    AddCategoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RatingModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:TokenInterceptor, multi: true },
    {provide:HTTP_INTERCEPTORS, useClass:GlobalErrorInterceptor, multi: true },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
