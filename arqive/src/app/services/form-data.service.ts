import { Injectable } from '@angular/core';

export interface PaymentFormData {
  contact?: {
    firstName: string;
    lastName: string;
    email: string;
  };
  shipping?: {
    address: string;
    city: string;
    postalCode: string;
  };
  payment?: {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class FormDataService {
  private formData: PaymentFormData = {};

  constructor() { }

  saveContactData(data: any): void {
    this.formData.contact = data;
  }

  saveShippingData(data: any): void {
    this.formData.shipping = data;
  }

  savePaymentData(data: any): void {
    this.formData.payment = data;
  }

  getContactData(): any {
    return this.formData.contact || {};
  }

  getShippingData(): any {
    return this.formData.shipping || {};
  }

  getPaymentData(): any {
    return this.formData.payment || {};
  }

  clearAllData(): void {
    this.formData = {};
  }
}
