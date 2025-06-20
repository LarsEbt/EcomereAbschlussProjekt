import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductBrowserComponent } from './pages/product-browser/product-browser.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { BasketComponent } from './pages/basket/basket.component';
import { PaymentComponent } from './pages/payment/payment.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home',
  },
  {
    path: 'product-browser',
    component: ProductBrowserComponent,
    title: 'Produkte',
  },
  {
    path: 'home',
    redirectTo: '',
    pathMatch: 'full',
  },  {
    path: 'product-page/:id',
    component: ProductPageComponent,
    title: 'Produktseite',
  },
  {
    path: 'basket',
    component: BasketComponent,
    title: 'Warenkorb',
  },  {
    path: 'payment',
    component: PaymentComponent,
    title: 'Bezahlung',
  },
];
