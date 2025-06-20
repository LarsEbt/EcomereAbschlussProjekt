import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { CartService, CartItem } from '../../services/cart.service';
import { FormDataService } from '../../services/form-data.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent implements OnInit {
  cartItems: CartItem[] = [];
  subtotal: number = 0;
  shipping: number = 4.99;
  total: number = 0;
  
  contactForm: FormGroup;
  shippingForm: FormGroup;
  paymentForm: FormGroup;
  
  checkoutComplete: boolean = false;
  processingPayment: boolean = false;
  orderNumber: string = '';
  
  // Add Math object to use in template
  Math: any = Math;
  
  constructor(
    private cartService: CartService,
    private formDataService: FormDataService,
    private fb: FormBuilder,
    private router: Router
  ) {
    // Generate order number in the constructor
    this.orderNumber = 'ORD-' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    
    // Initialize forms with saved data if available
    this.contactForm = this.fb.group({
      firstName: [this.formDataService.getContactData().firstName || '', [Validators.required, Validators.minLength(2)]],
      lastName: [this.formDataService.getContactData().lastName || '', [Validators.required, Validators.minLength(2)]],
      email: [this.formDataService.getContactData().email || '', [Validators.required, Validators.email]]
    });
    
    this.shippingForm = this.fb.group({
      address: [this.formDataService.getShippingData().address || '', [Validators.required, Validators.minLength(5)]],
      city: [this.formDataService.getShippingData().city || '', [Validators.required]],
      postalCode: [this.formDataService.getShippingData().postalCode || '', [Validators.required, Validators.pattern(/^\d{5}$/)]]
    });
    
    this.paymentForm = this.fb.group({
      cardNumber: [this.formDataService.getPaymentData().cardNumber || '', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      expiryDate: [this.formDataService.getPaymentData().expiryDate || '', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
      cvv: [this.formDataService.getPaymentData().cvv || '', [Validators.required, Validators.pattern(/^\d{3}$/)]]
    });
  }

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems(): void {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
      this.calculateTotals();
      
      // Redirect to basket if cart is empty
      if (items.length === 0 && !this.checkoutComplete) {
        this.router.navigate(['/basket']);
      }
    });
  }

  calculateTotals(): void {
    this.subtotal = this.cartService.calculateTotal();
    this.total = this.subtotal + this.shipping;
  }
  
  saveContactInfo(): void {
    if (this.contactForm.valid) {
      console.log('Kontaktinformationen gespeichert:', this.contactForm.value);
      this.formDataService.saveContactData(this.contactForm.value);
    }
  }
  
  saveShippingInfo(): void {
    if (this.shippingForm.valid) {
      console.log('Versandinformationen gespeichert:', this.shippingForm.value);
      this.formDataService.saveShippingData(this.shippingForm.value);
    }
  }
  
  processPayment(): void {
    if (this.paymentForm.valid) {
      console.log('Zahlungsinformationen verarbeiten:', this.paymentForm.value);
      this.formDataService.savePaymentData(this.paymentForm.value);
      this.processingPayment = true;
      
      // Simuliere eine Zahlungsverarbeitung
      setTimeout(() => {
        this.processingPayment = false;
        this.completeCheckout();
      }, 2000);
    }
  }
  
  completeCheckout(): void {
    // In einer echten App würden wir hier die Bestellung an den Server senden
    console.log('Bestellung abgeschlossen!', this.orderNumber);
    this.checkoutComplete = true;
    
    // Warenkorb leeren und Formulardaten zurücksetzen
    setTimeout(() => {
      this.cartService.clearCart();
      this.formDataService.clearAllData();
    }, 1000);
  }
  
  get isFormValid(): boolean {
    return this.contactForm.valid && this.shippingForm.valid && this.paymentForm.valid;
  }
    getItemCount(): number {
    return this.cartItems.reduce((count, item) => count + item.quantity, 0);
  }
  
  returnToShopping(): void {
    this.router.navigate(['/product-browser']);
  }
}
