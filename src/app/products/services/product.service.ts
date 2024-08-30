import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iproduct } from '../../shared/iproduct';
import { Icategory } from '../components/all-products/icategory';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http : HttpClient) { }
  getAllProduct():Observable<Iproduct[]>{

    return this.http.get<Iproduct[]>(`https://fakestoreapi.com/products`);
  } 
  getAllCategoryID():Observable<string[]>{
return this.http.get<string[]>(`https://fakestoreapi.com/products/categories`);

  } 
  getProductByCategory(catName:string):Observable<Iproduct[]>{
return this.http.get<Iproduct[]>(`https://fakestoreapi.com/products/category/${catName}`);

  } 
  getSingleProduct(id:number):Observable<Iproduct>{
return this.http.get<Iproduct>(`https://fakestoreapi.com/products/${id}`);
  }
}
