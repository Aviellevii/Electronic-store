import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { ControlProductComponent } from './Products/control-product/control-product.component';
import { CreateProductComponent } from './Products/create-product/create-product.component';
import { EditProductComponent } from './Products/edit-product/edit-product.component';
import { ShowProductsComponent } from './Products/show-products/show-products.component';
import { EditUserComponent } from './User/edit-user/edit-user.component';
import { ForgotPasswordComponent } from './User/forgot-password/forgot-password.component';
import { LoginComponent } from './User/login/login.component';
import { RegisterComponent } from './User/register/register.component';
import { ResetPasswordComponent } from './User/reset-password/reset-password.component';
import { ShowUsersComponent } from './User/show-users/show-users.component';
import { CreateBlogComponent } from './Blog/create-blog/create-blog.component';
import { ShowBlogsComponent } from './Blog/show-blogs/show-blogs.component';
import { ControlBlogComponent } from './Blog/control-blog/control-blog.component';
import { EditBlogComponent } from './Blog/edit-blog/edit-blog.component';
import { ShowCartComponent } from './Cart/show-cart/show-cart.component';
import { ProcessComponent } from './Cart/process/process.component';
import { CashComponent } from './Cart/cash/cash.component';
import { AddCategoryComponent } from './Pcategory/add-category/add-category.component';
import { EditCategoryComponent } from './Pcategory/edit-category/edit-category.component';
import { ShowCategoryComponent } from './Pcategory/show-category/show-category.component';

const routes: Routes = [
  {path:'',component:ShowProductsComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'users',component:ShowUsersComponent,canActivate:[AuthGuard]},
  {path:'control-product',component:ControlProductComponent,canActivate:[AuthGuard]},
  {path:'tag/:tagname',component:ShowProductsComponent},

  {path:'forgot-password',component:ForgotPasswordComponent},
  {path:'create-product',component:CreateProductComponent},
  {path:'cart',component:ShowCartComponent},

  {path:'create-blog',component:CreateBlogComponent},
  {path:'show-blogs',component:ShowBlogsComponent},
  {path:'control-blogs',component:ControlBlogComponent,canActivate:[AuthGuard]},
  {path:'process',component:ProcessComponent},
  {path:'cash',component:CashComponent},
  {path:'create-category',component:AddCategoryComponent,canActivate:[AuthGuard]},
  {path:'show-category',component:ShowCategoryComponent},

  {path:'edit-category/:id',component:EditCategoryComponent,canActivate:[AuthGuard]},

  {path:'edit-blog/:id',component:EditBlogComponent,canActivate:[AuthGuard]},

  
  {path:'edit-product/:id',component:EditProductComponent,canActivate:[AuthGuard]},
  {path:'reset-password/:id/:token',component:ResetPasswordComponent,canActivate:[AuthGuard]},
  {path:':id',component:EditUserComponent,canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
