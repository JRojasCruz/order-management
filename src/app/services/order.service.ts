import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getAllOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/orders`);
  }

  getCustomers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/customers`);
  }

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/products`);
  }

  getOrderById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/orders/${id}`);
  }

  createOrder(order: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/orders`, order);
  }

  updateOrder(id: string, order: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/orders/${id}`, order);
  }

  deleteOrder(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/orders/${id}`);
  }
}
