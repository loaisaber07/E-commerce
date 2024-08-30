import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Iproduct } from '../../../shared/iproduct';
import { ProductService } from '../../services/product.service';
import { Icart } from '../../icart';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  getProductDetails: Iproduct = {} as Iproduct;
  cartSelected: Icart[] = [];
  addCheck: boolean = false;
  amount: number = 0;
  constructor(private route: ActivatedRoute, private productServ: ProductService) {

  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(param => {
      this.getProductDetails.id = Number(param.get('id'));
    });
    this.productServ.getSingleProduct(this.getProductDetails.id).subscribe(prd => {
      this.getProductDetails = prd;
    });
  }
  getStarNumber(num: number): number[] {
    return new Array(num);
  }
  
  addToCart(obj:{item:Iproduct , quantity:number}){    
    if(obj.quantity >0) {   

      if("cart" in localStorage) { 
        this.cartSelected =JSON.parse(localStorage.getItem("cart")!) ; 
  let exist =this.cartSelected.find(item=>item.item.id ==obj.item.id) ; 
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

    getIndex(rowIndex:number){
      return rowIndex;
    }

}
