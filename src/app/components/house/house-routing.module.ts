import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HouseProductsComponent } from './components/house-products/house-products.component';
import { HouseHomeComponent } from './components/house-home/house-home.component';
import { HouseDetailsComponent } from './components/house-details/house-details.component';
import { ProductResolver } from 'src/app/resolvers/product.resolver';
import { ProductsResolver } from 'src/app/resolvers/products.resolver';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'h-products',
        component: HouseProductsComponent,
        data: { breadcrumb: { alias: 'Products' } },
        resolve: { data: ProductsResolver },
      },
      {
        path: 'h-home',
        component: HouseHomeComponent,
        data: { breadcrumb: { skip: true } },
      },
      { path: '', redirectTo: 'h-home', pathMatch: 'full' },
      {
        path: 'h-products/product/:id',
        component: HouseDetailsComponent,
        resolve: { data: ProductResolver },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HouseRoutingModule {}
