import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductBrowserComponent } from './pages/product-browser/product-browser.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';

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
  },
  {
    path: 'product-page',
    component: ProductPageComponent,
    title: 'Produktseite',
  },
];
