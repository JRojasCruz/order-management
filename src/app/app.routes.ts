import { Routes } from '@angular/router';
import { OrderListComponent } from './components/order-list/order-list.component';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';

export const routes: Routes = [
  { path: '', component: OrderListComponent },
  { path: 'orders/new', component: OrderFormComponent },
  { path: 'orders/:id', component: OrderDetailsComponent },
];
