import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Iproduct } from '../../../shared/iproduct';
import { ProductService } from '../../services/product.service'; 
import { Icart } from '../../icart';
@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.css'
})
export class AllProductsComponent implements OnInit {
  getAllProduct :Iproduct[] ={} as Iproduct[];
  getAllCategory:string[] ={} as string[]; 
  selectedCat:string ="null"; 
  cartSelected:Icart[] = [];
  addCheck:boolean =false; 
  amount:number =0 ;
constructor(private productService :ProductService){ 
productService.getAllCategoryID().subscribe(res=>{
  this.getAllCategory = res ;  
}) ; 

}
 
  ngOnInit(): void { 
    
    this.productService.getAllProduct().subscribe(res=>{
      this.getAllProduct =res ; 
    }) ;
  
  } 
  productList(catName :string){
    if(catName =="null"){
      this.productService.getAllProduct().subscribe(res=>{
        this.getAllProduct =res ; 
      }) ;


    }else{
    this.productService.getProductByCategory(catName).subscribe(res=>{
      this.getAllProduct=res ; 
      
         }) ; }

  } 
  addToCart(obj:{item:Iproduct , quantity:number}){    
    if(obj.quantity >0) {   

      if("cart" in localStorage) { 
        this.cartSelected =JSON.parse(localStorage.getItem("cart")!) ; 
  let exist =this.cartSelected.find(item=> item.item.id==obj.item.id) ; 
  if(exist){
  alert("already in your cart") ; 
  } 
  else{
  
   this.cartSelected.push(obj);  
   localStorage.setItem("cart" , JSON.stringify(this.cartSelected));
  }
      }else {
  
        this.cartSelected.push(obj); 
        localStorage.setItem("cart" , JSON.stringify(this.cartSelected));
  
      } 
      this.addCheck=false ;
  
    } 
    else {
      alert("can't add while the quantity is 0");
    }
    }
    
}
