import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-payment',
  imports: [],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css',
})
export class PaymentComponent {
  stripe: any;
  elements: any;
  cardNumber: any;
  cardExpiry: any;
  cardCvc: any;
  clientSecret: string | null = null;

  // Inject HttpClient directly
  private http = inject(HttpClient);

  ngOnInit(): void {
    loadStripe('pk_test_51QyX2k2f0IUkWUsZuuIcH9RE0DGgOG5DGIWhAx390thJpkzniZIjQNAqZhKqA5NfF754CjuOFsBzOLBYgypSBiLV00r8vZQ6In').then((stripe) => {
      this.stripe = stripe;
      this.elements = this.stripe.elements();

      // Create individual elements for card number, expiry, and CVC
      this.cardNumber = this.elements.create('cardNumber');
      this.cardExpiry = this.elements.create('cardExpiry');
      this.cardCvc = this.elements.create('cardCvc');

      // Mount the elements to their respective HTML divs
      this.cardNumber.mount('#card-number');
      this.cardExpiry.mount('#card-expiry');
      this.cardCvc.mount('#card-cvc');
    });
  }

  createPaymentIntent(amount: number): void {
    // Make a call to your backend to create a PaymentIntent
    this.http
      .post<any>('http://localhost:8080/api/payment/create-payment-intent', {
        amount,
      })
      .subscribe((response) => {
        this.clientSecret = response.clientSecret;
      });
  }

  async handlePayment(): Promise<void> {
    if (!this.clientSecret) {
      console.error('Payment intent not created');
      return;
    }

    const { error, paymentIntent } = await this.stripe.confirmCardPayment(
      this.clientSecret,
      {
        payment_method: {
          card: this.cardNumber, // Attach the card element to the payment method
        },
      }
    );

    if (error) {
      console.error('Error:', error.message);
    } else if (paymentIntent.status === 'succeeded') {
      // console.log('Payment successful!', paymentIntent);
    }
  }

  onSubmit(amount: number): void {
    this.createPaymentIntent(amount);
  }
}
