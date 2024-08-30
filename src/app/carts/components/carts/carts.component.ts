import { Component, OnInit } from '@angular/core';
import { Cartlocal } from '../../cartlocal';
import { Iproduct } from '../../../shared/iproduct';
import { CartService } from '../../services/cart.service';
import { Icart } from '../../../products/icart';

@Component({
  selector: 'app-carts',
  templateUrl: './carts.component.html',
  styleUrl: './carts.component.css'
})
export class CartsComponent implements OnInit {
  getCart:Icart[]={} as Icart[];
  getAllProduct: Iproduct[] = [];
  disableAdd:boolean=false; 
  disableMin:boolean=false ; 
  totalPrice:number=0 
  successAdd :boolean=false ;
  constructor(private cartServices: CartService) { }

  ngOnInit(): void {
    this.getAllCart();
    this.getAllProducts();
  }


  getAllProducts() {

    for (let singlePrd of this.getCart) {
      this.cartServices.getSingleProduct(singlePrd.item.id).subscribe(prd => {
        this.getAllProduct.push(prd);
      });

    }
    alert(this.getAllProduct[0].price.toString)
  }


  getAllCart() { 
    this.totalPrice=0;
    if ("cart" in localStorage) {
      this.getCart = JSON.parse(localStorage.getItem("cart")!);
      alert("get all cart")
    } else {
      alert("Nothing have been added yet!");
    } 
    for(let x of this.getCart)
      {
        this.totalPrice+= x.item.price * x.quantity ; 
      }
  }
  addQuantity(index:number){ 
    this.totalPrice=0;
    if(this.getCart[index].quantity >=1){
      this.disableMin=false;
    }
    this.getCart[index].quantity++ ; 
    localStorage.setItem("cart" , JSON.stringify(this.getCart)); 
    for(let x of this.getCart)
      {
        this.totalPrice+= x.item.price * x.quantity ; 
      }
  }
  minusQuantity(index:number){
    this.totalPrice=0;
    if(this.getCart[index].quantity <=1 ){
      this.disableMin=true ; 
    }else{ 
      this.disableMin=false;
      this.getCart[index].quantity-- ; 
      if(this.getCart[index].quantity <=1 ){
        this.disableMin=true ; 
      }
      localStorage.setItem("cart" , JSON.stringify(this.getCart));
      for(let x of this.getCart)
        {
          this.totalPrice+= x.item.price * x.quantity ; 
        }
    }
  }
  deleteAll(){
    this.getCart=[]; 
    localStorage.setItem("cart" , JSON.stringify(this.getCart));
    this.totalPrice=0;

  }
  delete(index:number){
this.totalPrice=0;
    this.getCart.splice(index,1);
localStorage.setItem("cart" , JSON.stringify(this.getCart));
for(let x of this.getCart)
  {
    this.totalPrice+= x.item.price * x.quantity ; 
  }


  }

  addCart(){
let product = this.getCart.map(item=>{
  return {productid:item.item.id , quantity:item.quantity}
}); 
let Model ={
  userid:5 , 
  date:new Date() , 
  products:product
}  ; 
this.cartServices.addCart(Model).subscribe(res=>{
this.successAdd=true ; 
this.deleteAll();
});

  }
  getIndex(rowIndex:number){
    return rowIndex;
  }
}
