import { Component } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.css',
})
export class OrderFormComponent {
  order: any = { customer: { id: '' }, products: [] };
  customers: any[] = [];
  products: any[] = [];
  selectedProducts: any[] = [];
  isEdit = false;

  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit(): void {
    this.orderService.getCustomers().subscribe((customers: any[]) => {
      this.customers = customers;
    });
    this.orderService.getProducts().subscribe((products: any[]) => {
      this.products = products;
    });
  }

  addProduct(event: any): void {
    const productId = +event.target.value;
    const product = this.products.find((p) => p.id === productId);

    if (product && !this.selectedProducts.includes(product)) {
      this.selectedProducts.push(product);
      this.order.products = this.selectedProducts.map((p) => ({
        id: p.id,
      }));
    }

    event.target.value = '';
  }

  removeProduct(index: number): void {
    this.selectedProducts.splice(index, 1);
    this.order.products = this.selectedProducts.map((p) => p.id);
  }

  saveOrder(): void {
    this.orderService.createOrder(this.order).subscribe(() => {
      alert('Pedido guardado exitosamente');
      this.cleanForm();
    });
  }

  cleanForm(): void {
    this.order = { customer: {}, products: [] };
    this.selectedProducts = [];
  }
}
