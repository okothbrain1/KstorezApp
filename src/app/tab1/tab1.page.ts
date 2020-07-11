import { Component, ViewChild, ElementRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { CartService } from '../services/cart.service';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  items: Observable<any[]>;
  cart = [];
  products = [];
  cartItemCount: BehaviorSubject<number>;
 
  @ViewChild('cart', {static: false, read: ElementRef})fab: ElementRef;
 
  constructor(private cartService: CartService, private modalCtrl: ModalController,firestore: AngularFirestore) {
    
  }
 
  ngOnInit() {
    this.items = this.cartService.retrieve_products();
    this.cart = this.cartService.getCart();
    this.cartItemCount = this.cartService.getCartItemCount();
  }
 
  addToCart(product) {
    this.cartService.addProduct(product);
  
  }
 

}
