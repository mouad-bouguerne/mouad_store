
import { Component, computed, signal } from '@angular/core';

interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  image: string;
  badge?: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  products: Product[] = [
    {
      id: 1,
      name: 'Professional Laptop',
      category: 'Laptops',
      description: 'Powerful laptop for work and development.',
      price: 899,
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=85',
      badge: 'Best Seller'
    },
    {
      id: 2,
      name: 'Premium Smartphone',
      category: 'Smartphones',
      description: 'A modern smartphone for your everyday life.',
      price: 599,
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=85',
      badge: 'Popular'
    },
    {
      id: 3,
      name: 'Wireless Headphones',
      category: 'Accessories',
      description: 'Enjoy clear sound and wireless freedom.',
      price: 99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85'
    }
  ];

  cartItems = signal<CartItem[]>([]);
  isCartOpen = signal(false);

  cartCount = computed(() =>
    this.cartItems().reduce((total, item) => total + item.quantity, 0)
  );

  cartTotal = computed(() =>
    this.cartItems().reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    )
  );

  addToCart(productId: number): void {
    const product = this.products.find(item => item.id === productId);

    if (!product) return;

    this.cartItems.update(items => {
      const existingItem = items.find(
        item => item.product.id === productId
      );

      if (existingItem) {
        return items.map(item =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...items, { product, quantity: 1 }];
    });

    this.isCartOpen.set(true);
  }

  increaseQuantity(productId: number): void {
    this.cartItems.update(items =>
      items.map(item =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }

  decreaseQuantity(productId: number): void {
    this.cartItems.update(items =>
      items
        .map(item =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  }

  removeFromCart(productId: number): void {
    this.cartItems.update(items =>
      items.filter(item => item.product.id !== productId)
    );
  }

  toggleCart(): void {
    this.isCartOpen.update(open => !open);
  }

  closeCart(): void {
    this.isCartOpen.set(false);
  }

  continueShopping(): void {
    this.closeCart();
  }

  checkout(): void {
    // Checkout will be implemented in the next development step.
    this.closeCart();
  }
}