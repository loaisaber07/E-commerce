import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllProductsComponent } from './products/components/all-products/all-products.component';
import { ProductDetailsComponent } from './products/components/product-details/product-details.component';
import { CartsComponent } from './carts/components/carts/carts.component';

const routes: Routes = [
{path:"Product" , component:AllProductsComponent} , 
{path:"Details/:id" , component:ProductDetailsComponent}, 
{path:"Cart" , component:CartsComponent} , 
{path:"**" , redirectTo:"Product" , pathMatch:"full"}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
