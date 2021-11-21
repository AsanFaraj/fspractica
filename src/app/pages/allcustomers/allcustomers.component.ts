import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-allcustomers',
  templateUrl: './allcustomers.component.html',
  styleUrls: ['./allcustomers.component.css']
})
export class AllcustomersComponent implements OnInit {

  items: Observable<any[]>;
  firestore : AngularFirestore;
  constructor(firestore: AngularFirestore) {
    this.firestore = firestore;
    this.items = firestore.collection('customers').valueChanges({ idField: 'id' });
  }

  ngOnInit(): void {
  }

  //delete customer
  deleteCustomer(id: string) {
    this.firestore.doc('customers/' + id).delete();
  }

}
