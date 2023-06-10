import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/Services/alertify.service';
import { CartService } from 'src/app/Services/cart.service';
import { OrderService } from 'src/app/Services/order.service';

declare var paypal: any;

@Component({
  selector: 'app-paypal-btn',
  templateUrl: './paypal-btn.component.html',
  styleUrls: ['./paypal-btn.component.scss']
})
export class PaypalBtnComponent {
  @Input()
  order!:any;

  @ViewChild('paypal', {static: true})
  paypalElement!:ElementRef;

  constructor(private orderService: OrderService,
              private cartService: CartService,
              private router:Router,
              private alertify:AlertifyService) { }

  ngOnInit(): void {
    const self = this;
    paypal
    .Buttons({
      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                currency_code: 'CAD',
                value: self.order.total,
              },
            },
          ],
        });
      },

      onApprove: async (data: any, actions: any) => {
        const payment = await actions.order.capture();
        this.order.paymentId = payment.id;
        self.orderService.pay(this.order).subscribe(
          {
            next: (orderId) => {
              this.cartService.deleteCart();
              this.alertify.success('Payment success')
            },
            error: (error) => {
              this.alertify.error('Payment Save Failed');
            }
          }
        );
      },

      onError: (err: any) => {
        this.alertify.error('Payment Failed');
        console.log(err);
      },
    })
    .render(this.paypalElement.nativeElement);
  }
}
