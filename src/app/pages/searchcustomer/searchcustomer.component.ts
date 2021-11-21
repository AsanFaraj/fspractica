import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import {BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-searchcustomer',
  templateUrl: './searchcustomer.component.html',
  styleUrls: ['./searchcustomer.component.css']
})
export class SearchcustomerComponent implements OnInit {


  firestore: AngularFirestore;

  user: any;

  idCustomer: string = "";

  idCustomer2: string = "";

  idCustomer3: string = "";

  idCustomer4: string = "";


  productName: string = "";

  price : number = 0;

  customerName: string = "";
  customerAge: number = 0;


  products: any;

  age: number = 0;

  filteredCustomers: any;

  expensiveOrders: any;

  allExpensiveOrders: any;




  constructor(firestore: AngularFirestore) {
    this.firestore = firestore;   

  }

  ngOnInit(): void {
  }

  //get customer by id
  getCustomerById(id: string) {
    this.user = this.firestore.collection('customers').doc(id).valueChanges();
  }

  //get customer by age
   getAdults() {
    this.filteredCustomers = this.firestore.collection('customers', ref => ref.where('age', '>=', 18)).valueChanges();
  }

  //get customers under the age of 18
  getChildren() {
    this.filteredCustomers = this.firestore.collection('customers', ref => ref.where('age', '<', 18)).valueChanges();
  }

  getCustomerProducts() {
    this.products = this.firestore.collection('customers').doc(this.idCustomer2).collection('orders').valueChanges({ idField: 'id' });
  }

  //add product to customer
  addProduct() {
    this.firestore.collection('customers').doc(this.idCustomer3).collection('orders').add({
      productName: this.productName,
      price: Number(this.price)
    });
  }

  deleteProduct(id: string) {
    this.firestore.collection('customers').doc(this.idCustomer2).collection('orders').doc(id).delete();
  }

  //add customer
  addCustomer() {
    this.firestore.collection('customers').add({
      name: this.customerName,
      age: Number(this.customerAge)
    });
  }

  //get orders from a customer where the price is greater than a 20
  getExpensiveOrders() {
    this.expensiveOrders = this.firestore.collection('customers').doc(this.idCustomer4).collection('orders', ref => ref.where('price', '>=', 20)).valueChanges();
  }

  //get all orders from all customers where the price is higher than 20
  getAllExpensiveOrders() {
  this.allExpensiveOrders = this.firestore.collectionGroup("orders", ref=> ref.where("price",">=",20)).valueChanges();
  }


/*
1
https://firestore.googleapis.com/v1/projects/practica1asan/databases/(default)/documents/customers <-GET->

2
https://firestore.googleapis.com/v1/projects/practica1asan/databases/(default)/documents/customers/4FHQYosifixPd2kyTJIP <-GET->

3
https://firestore.googleapis.com/v1/projects/practica1asan/databases/(default)/documents/customers/4FHQYosifixPd2kyTJIP/orders <-GET->

4
https://firestore.googleapis.com/v1/projects/practica1asan/databases/(default)/documents/customers/4FHQYosifixPd2kyTJIP/orders <-POST->
{"fields": {"price":{"integerValue":20},"productname":{"stringValue":"muis"}}}

5
https://firestore.googleapis.com/v1/projects/practica1asan/databases/(default)/documents/customers:runQuery <-POST->
{"structuredQuery":{"from":[{"collectionId":"customers"}]}}


parent does not match pattern: /^projects\/[^/]+\/databases\/[^/]+\/documents\/[^/]+\/.*$/


https://firestore.googleapis.com/v1/projects/practica1asan/databases/(default)/documents/customers:runQuery <-POST->
{"structuredQuery":{"from":[{"collectionId":"customers"}],
"where":{"fieldFilter":{"field":{"fieldPath":"age"},"op":"GREATER_THAN","value":{"integerValue":18}}}}}
*/



}



// query customer collection on name
// https://firestore.googleapis.com/v1/projects/practica1asan/databases/(default)/documents/customers:runQuery
// {"structuredQuery":{"from":[{"collectionId":"customers"}],
// "where":{"fieldFilter":{"field":{"fieldPath":"name"},"op":"EQUAL","value":{"stringValue":"juan"}}}}}


