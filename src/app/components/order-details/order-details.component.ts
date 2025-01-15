import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css',
})
export class OrderDetailsComponent {
  order: any = { customer: {}, products: [] }; // Almacena los detalles del pedido
  customers: any[] = []; // Lista de clientes
  products: any[] = []; // Lista de productos
  selectedProducts: any[] = []; // Productos seleccionados
  isEditing = false; // Modo edición

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadOrder();
    this.getCustomers();
    this.getProducts();
  }

  loadOrder(): void {
    const orderId = this.route.snapshot.paramMap.get('id');
    if (orderId) {
      this.orderService.getOrderById(orderId).subscribe((order) => {
        this.order = order;
        this.selectedProducts = [...order.products];
      });
    }
  }

  getCustomers(): void {
    this.orderService.getCustomers().subscribe((customers: any[]) => {
      this.customers = customers;
    });
  }

  getProducts(): void {
    this.orderService.getProducts().subscribe((products: any[]) => {
      this.products = products;
    });
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
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
    this.order.products = this.selectedProducts.map((p) => ({
      id: p.id,
    }));
  }

  saveOrder(): void {
    this.order.products = this.selectedProducts.map((p) => ({
      id: p.id,
    }));

    if (this.order.products.length === 0) {
      alert('Debes seleccionar al menos un producto');
      return;
    }

    this.orderService.updateOrder(this.order.id, this.order).subscribe(() => {
      alert('Pedido actualizado exitosamente');
      this.loadOrder();
      this.isEditing = false; // Volver al modo de solo lectura
    });
  }
}
