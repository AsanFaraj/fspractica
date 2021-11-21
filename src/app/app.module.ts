import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { SearchcustomerComponent } from './pages/searchcustomer/searchcustomer.component';
import { Routes, RouterModule } from '@angular/router';
import { AllcustomersComponent } from './pages/allcustomers/allcustomers.component'; // CLI imports router
import { FormsModule } from '@angular/forms';


const routes: Routes = [
  { path: 'search-customer', component: SearchcustomerComponent },
  { path: '', component: AllcustomersComponent },
];
@NgModule({
  declarations: [
    AppComponent,
    SearchcustomerComponent,
    AllcustomersComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    FormsModule
  ],
  exports: [
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
